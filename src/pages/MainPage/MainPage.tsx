import { useEffect, useState } from 'react';
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
  FormSelect,
  Button,
} from 'react-bootstrap';
import { countries, maxYear, minYear } from '@shared/consts/consts';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useDebounce } from '@shared/lib/useDebounce';
import { createFilterQueryString, updateLastQueryHistory } from './utils/utils';

export interface MainPageFilters {
  name: string;
  year: string;
  country: string;
  ageRating: string;
  page: number;
  perPage: number;
}

export const MainPage = () => {
  const location: {
    state: { filters: MainPageFilters } | null;
    search: string;
  } = useLocation();

  const [searchParams, setSearchParams] = useSearchParams(
    new URLSearchParams(location.search),
  );

  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page')) || location.state?.filters?.page || 1,
  );

  const [itemsPerPage, setItemsPerPage] = useState(
    Number(searchParams.get('perPage')) ||
      location.state?.filters?.perPage ||
      10,
  );

  const [searchName, setSearchName] = useState(
    searchParams.get('name') || location.state?.filters?.name || '',
  );

  const debouncedSearchName = useDebounce(searchName);

  const [searchYear, setSearchYear] = useState(
    searchParams.get('year') || location.state?.filters?.year || '',
  );

  const debouncedSearchYear = useDebounce(searchYear);

  const [searchCountry, setSearchCountry] = useState(
    searchParams.get('country') || location.state?.filters?.country || '',
  );

  const [searchAgeRating, setSearchAgeRating] = useState(
    searchParams.get('ageRating') || location.state?.filters?.ageRating || '',
  );

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
  } = useGetMoviesQuery({
    page: currentPage,
    limit: itemsPerPage,
    query,
  });
  const total = 100;
  const ageRatins = ['6', '12', '16', '18'];

  const filteredByName = debouncedSearchName
    ? movieList?.docs.filter((m) =>
        debouncedSearchName
          ? m.names?.some((n) => n.name.includes(debouncedSearchName))
          : m,
      )
    : movieList?.docs;

  useEffect(() => {
    updateLastQueryHistory(
      `${query}${searchName ? `&name=${searchName}` : ''}`,
    );
  }, [query, searchName]);

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
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setSearchParams((params) => {
                e.target.value
                  ? params.set('perPage', e.target.value)
                  : params.delete('perPage');
                return params;
              });
            }}
            value={itemsPerPage}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Поиск фильмов и сериалов по названию</FormLabel>
          <FormControl
            placeholder="Введите поисковой запрос..."
            type="text"
            value={searchName}
            onChange={(e) => {
              setSearchName(e.target.value);
              setSearchParams((params) => {
                e.target.value
                  ? params.set('name', e.target.value)
                  : params.delete('name');
                return params;
              });
            }}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Фильтры:</FormLabel>
          <Row className="px-3 gap-3 justify-content-center">
            <Col xs="12" lg="auto" className="flex-grow-1">
              <Col>
                <FormControl
                  id="search-year"
                  onChange={(e) => {
                    setSearchYear(e.target.value);
                    setSearchParams((params) => {
                      e.target.value
                        ? params.set('year', e.target.value)
                        : params.delete('year');
                      return params;
                    });
                  }}
                  type="number"
                  placeholder="Год"
                  min={minYear}
                  max={maxYear}
                  value={searchYear}
                />
              </Col>
            </Col>
            <Col xs="12" lg="auto" className="flex-grow-1" defaultValue="">
              <FormSelect
                onChange={(e) => {
                  setSearchCountry(e.target.value);
                  setSearchParams((params) => {
                    e.target.value
                      ? params.set('country', e.target.value)
                      : params.delete('country');
                    return params;
                  });
                }}
                value={searchCountry}
              >
                <option value="">Страна</option>
                {countries.map((c) => (
                  <option value={c} key={c}>
                    {c}
                  </option>
                ))}
              </FormSelect>
            </Col>
            <Col xs="12" lg="auto" className="flex-grow-1">
              <FormSelect
                onChange={(e) => {
                  setSearchAgeRating(e.target.value);
                  setSearchParams((params) => {
                    e.target.value
                      ? params.set('ageRating', e.target.value)
                      : params.delete('ageRating');
                    return params;
                  });
                }}
                value={searchAgeRating}
              >
                <option value="">Возрастной рейтинг</option>
                {ageRatins.map((r) => (
                  <option value={r} key={r}>
                    {r}+
                  </option>
                ))}
              </FormSelect>
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
                    search={location.search}
                  />
                </li>
              ))
            : 'По введёным фильтрам на текущей странице фильмов и сериалов не найдено'}
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
