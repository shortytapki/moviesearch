import { type ChangeEvent, useCallback, useEffect, useState } from 'react';
import { MovieCard, useGetMoviesQuery } from '@entities/Movie';
import { BigPagination } from '@shared/ui';
import {
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Spinner,
  Col,
  Button,
} from 'react-bootstrap';
import { countries, maxYear, minYear } from '@shared/consts/consts';
import { useLocation, useSearchParams } from 'react-router-dom';
import { debounce, useDebounce } from '@shared/lib/useDebounce';
import {
  REFETCH_ATTEMPTS,
  createFilterQueryString,
  updateLastQueryHistory,
} from './utils/utils';
import Select, { type MultiValue } from 'react-select';

export interface MainPageFilters {
  name: string;
  year: string;
  country: string;
  ageRating: string;
  page: number;
  perPage: number;
}

export const MainPage = () => {
  const [fetchCount, setFetchCount] = useState(1);
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams(
    new URLSearchParams(location.search),
  );

  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page')) || 1,
  );

  const [itemsPerPage, setItemsPerPage] = useState(
    Number(searchParams.get('perPage')) || 10,
  );

  const [searchName, setSearchName] = useState(searchParams.get('name') || '');
  const [searchYear, setSearchYear] = useState(searchParams.get('year') || '');

  const [searchCountry, setSearchCountry] = useState(
    searchParams.get('country') || '',
  );

  const [searchAgeRating, setSearchAgeRating] = useState(
    searchParams.get('ageRating') || '',
  );

  const debouncedSearchYear = useDebounce(searchYear);
  const debouncedSearchName = useDebounce(searchName);
  const debouncedPerPage = useDebounce(itemsPerPage);

  const resetFilters = () => {
    [
      setSearchName,
      setSearchYear,
      setSearchCountry,
      setSearchAgeRating,
    ].forEach((setter) => setter(''));
    setItemsPerPage(10);
    setCurrentPage(1);
    setSearchParams(new URLSearchParams());
  };

  const query = createFilterQueryString({
    ageRating: searchAgeRating,
    'countries.name': searchCountry,
    year: debouncedSearchYear,
  });

  const {
    data: movieList,
    isFetching: isFetchingMainList,
    isError,
    refetch,
  } = useGetMoviesQuery({
    page: currentPage,
    limit: debouncedPerPage,
    query,
  });
  const total = 100;
  const ageRatings = ['6', '12', '16', '18'];

  const filteredByName = debouncedSearchName
    ? movieList?.docs.filter((m) =>
        debouncedSearchName
          ? m.names?.some((n) => n.name.includes(debouncedSearchName))
          : m,
      )
    : movieList?.docs;

  useEffect(() => {
    if (query || debouncedSearchName) {
      updateLastQueryHistory(
        `?${query}${debouncedSearchName ? `&name=${debouncedSearchName}` : ''}`,
      );
    }
  }, [query, debouncedSearchName]);

  useEffect(() => {
    if (fetchCount < REFETCH_ATTEMPTS && isError) {
      refetch();
      setFetchCount(fetchCount + 1);
    }
  }, [isError]);

  const changePerPageParam = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const toSet = value > 1 && value < total ? value : 1;
    setItemsPerPage(toSet);
    debounce(() => {
      setSearchParams((params) => {
        params.set('perPage', String(toSet));
        return params;
      });
    });
  }, []);

  const changeNameParam = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchName(value);
    debounce(() => {
      setSearchParams((params) => {
        value ? params.set('name', value) : params.delete('name');
        return params;
      });
    });
  }, []);

  const changeYearParam = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchYear(value);
    debounce(() => {
      setSearchParams((params) => {
        value ? params.set('year', value) : params.delete('year');
        return params;
      });
    });
  }, []);

  const changeRatingParam = useCallback(
    (options: MultiValue<{ label: string; value: string }>) => {
      const value =
        options.length > 1
          ? options.map((o) => o.value).join('&ageRating=+')
          : options.at(0)?.value || '';
      setSearchAgeRating(value);
      setSearchParams((params) => {
        value ? params.set('ageRating', value) : params.delete('ageRating');
        return params;
      });
    },
    [],
  );

  const changeCountryParam = useCallback(
    (options: MultiValue<{ label: string; value: string }>) => {
      const value =
        options.length > 1
          ? options.map((o) => o.value).join('&countries.name=+')
          : options.at(0)?.value || '';
      setSearchCountry(value);
      setSearchParams((params) => {
        value ? params.set('country', value) : params.delete('country');
        return params;
      });
    },
    [],
  );

  return (
    <Container fluid>
      <Button onClick={resetFilters} className="mb-4">
        Сбросить фильтры
      </Button>
      <Form className="d-flex flex-column gap-4">
        <FormGroup>
          <FormLabel>Количество фильмов на странице</FormLabel>
          <FormControl
            type="number"
            min={1}
            max={total}
            onChange={changePerPageParam}
            value={itemsPerPage}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Поиск фильмов и сериалов по названию</FormLabel>
          <FormControl
            placeholder="Введите поисковой запрос..."
            type="text"
            value={searchName}
            onChange={changeNameParam}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Фильтры:</FormLabel>
          <Row className="px-3 gap-3 justify-content-center">
            <Col xs="12" lg="auto" className="flex-grow-1">
              <Col>
                <FormControl
                  id="search-year"
                  onChange={changeYearParam}
                  type="number"
                  placeholder="Год"
                  min={minYear}
                  max={maxYear}
                  value={searchYear}
                />
              </Col>
            </Col>
            <Col>
              <Select
                className="w-100"
                isMulti
                onChange={changeCountryParam}
                placeholder="Страны производства"
                options={countries.map((c) => ({ label: c, value: c }))}
                noOptionsMessage={() => 'Стран не найдено'}
                styles={{
                  menu: (base) => ({ ...base, zIndex: '999!important' }),
                }}
                defaultValue={countries
                  .filter((c) => searchCountry.includes(c))
                  .map((c) => ({ label: c, value: c }))}
              />
            </Col>
            <Col>
              <Select
                className="w-100"
                isMulti
                onChange={changeRatingParam}
                placeholder="Возрастной рейтинг"
                options={ageRatings.map((r) => ({ label: r, value: r }))}
                noOptionsMessage={() => 'Значений не найдено'}
                styles={{
                  menu: (base) => ({ ...base, zIndex: '999!important' }),
                }}
                defaultValue={ageRatings
                  .filter((r) =>
                    searchAgeRating.includes(String(parseInt(r, 10))),
                  )
                  .map((r) => ({ label: r, value: r }))}
              />
            </Col>
          </Row>
        </FormGroup>
        <BigPagination
          entityName="moviesPagination"
          className="justify-content-center"
          currentPage={currentPage || 1}
          itemsPerPage={itemsPerPage}
          total={total}
          onPageChange={setCurrentPage}
        />
      </Form>
      {isFetchingMainList ? (
        <Spinner />
      ) : (
        <ul className="d-flex flex-wrap justify-content-center list-unstyled gap-4">
          {movieList &&
          !isError &&
          filteredByName?.length &&
          filteredByName.length > 0
            ? filteredByName?.map((movie) => (
                <li key={movie.id}>
                  <MovieCard
                    className="h-100"
                    movie={movie}
                    search={{
                      page: currentPage,
                      perPage: itemsPerPage,
                      name: searchName,
                      year: searchYear,
                      country: searchCountry,
                      ageRating: searchAgeRating,
                    }}
                  />
                </li>
              ))
            : !isError &&
              'По введёным фильтрам на текущей странице фильмов и сериалов не найдено'}
        </ul>
      )}
      {isError && (
        <p className="text-danger fs-3">
          Ошибка загрузки фильмов, повторите попытку позже.
        </p>
      )}
    </Container>
  );
};
