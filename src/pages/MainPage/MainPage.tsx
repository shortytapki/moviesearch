import { type ChangeEvent, useCallback, useEffect, useState } from 'react';
import {
  MovieCard,
  useGetMovieByNameQuery,
  useGetMoviesQuery,
} from '@entities/Movie';
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
import {
  MOVIE_SEARCH_QUERY_HISTORY,
  countries,
  maxYear,
  minYear,
} from '@shared/consts/consts';
import { useLocation } from 'react-router-dom';
import { useDebounce } from '@shared/lib/useDebounce';
import {
  REFETCH_ATTEMPTS,
  createFilterQueryString,
  updateLastQueryHistory,
} from './utils/utils';
import Select, { type MultiValue } from 'react-select';
import classNames from 'classnames';

export interface MainPageFilters {
  name: string;
  year: string;
  country: string;
  ageRating: string;
  page: number;
  perPage: number;
}

export const MainPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [searchHistory, setSearchHistory] = useState(updateLastQueryHistory());
  const splitYear = searchParams.get('year')?.split('-');
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page')) || 1,
  );

  const [itemsPerPage, setItemsPerPage] = useState(
    Number(searchParams.get('limit')) || 10,
  );

  const [name, setName] = useState(searchParams.get('name') || '');
  const [yearLeft, setYearLeft] = useState(splitYear?.at(0) || '');
  const [yearRight, setYearRight] = useState(splitYear?.at(1) || '');

  const year =
    yearLeft && yearRight ? `${yearLeft}-${yearRight}` : yearLeft || yearRight;

  const [searchCountry, setSearchCountry] = useState(
    searchParams.get('country') || '',
  );

  const [ageRating, setAgeRating] = useState(
    searchParams.get('ageRating') || '',
  );

  const [linkCopyStatus, setlinkCopyStatus] = useState<
    '' | 'success' | 'error'
  >('');

  const [fetchCount, setFetchCount] = useState(1);
  const pickedCountriesSet = new Set(searchCountry.split('&countries.name=+'));
  const pickedRatingsSet = new Set(ageRating.split('-'));
  const debouncedYear = useDebounce(year);
  const debouncedName = useDebounce(name);
  const debouncedPerPage = useDebounce(itemsPerPage);

  const resetFilters = () => {
    [
      setName,
      setYearLeft,
      setYearRight,
      setSearchCountry,
      setAgeRating,
    ].forEach((setter) => setter(''));
    setItemsPerPage(10);
    setCurrentPage(1);
  };

  const query = createFilterQueryString({
    ageRating,
    'countries.name': searchCountry,
    year: debouncedYear,
  });

  const {
    data: movieList,
    isFetching: isFetchingMainList,
    isError: movieListError,
    refetch: refetchMovieList,
  } = useGetMoviesQuery({
    page: currentPage,
    limit: debouncedPerPage,
    query,
  });

  const {
    data: nameFilteredMovieList,
    isError: nameFilteredMovieListError,
    isFetching: isFethcingNameFilteredList,
  } = useGetMovieByNameQuery(
    {
      page: currentPage,
      limit: debouncedPerPage,
      query: debouncedName,
    },
    { skip: !debouncedName },
  );

  const isError = nameFilteredMovieListError || movieListError;
  const isFetching = isFetchingMainList || isFethcingNameFilteredList;

  const total = 100;
  const ageRatings = [6, 12, 16, 18];

  useEffect(() => {
    if (query || debouncedName) {
      setSearchHistory(
        updateLastQueryHistory(
          `?${query}${debouncedName ? `&name=${debouncedName}` : ''}`,
        ),
      );
    }
  }, [query, debouncedName]);

  useEffect(() => {
    if (fetchCount < REFETCH_ATTEMPTS && isError) {
      refetchMovieList();
      setFetchCount(fetchCount + 1);
    }
  }, [isError]);

  const onPerPageChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const toSet = value > 1 && value < total ? value : 1;
    setItemsPerPage(toSet);
  }, []);

  const onNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const onYearLeftChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setYearLeft(e.target.value);
  }, []);

  const onYearRightChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setYearRight(e.target.value);
  }, []);

  const onAgeRatingChange = useCallback(
    (options: MultiValue<{ label: number; value: number }>) => {
      let value: string;
      if (options.length > 1) {
        const sortedRating = options.map((o) => o.value).sort((a, b) => a - b);
        value = `${sortedRating.at(0)}-${sortedRating.at(options.length - 1)}`;
      } else {
        value = String(options.at(0)?.value || '');
      }
      setAgeRating(value);
    },
    [],
  );

  const onCountryChange = useCallback(
    (options: MultiValue<{ label: string; value: string }>) => {
      const value =
        options.length > 1
          ? options.map((o) => o.value).join('&countries.name=+')
          : options.at(0)?.value || '';
      setSearchCountry(value);
    },
    [],
  );

  const onClearHistory = useCallback(() => {
    localStorage.removeItem(MOVIE_SEARCH_QUERY_HISTORY);
    setSearchHistory([]);
  }, []);

  const onCopyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(
        window.location.origin + `/?${query}`,
      );
      setlinkCopyStatus('success');
    } catch (e) {
      setlinkCopyStatus('error');
    } finally {
      setTimeout(() => setlinkCopyStatus(''), 3000);
    }
  };

  const renderedList = debouncedName ? nameFilteredMovieList : movieList;
  const foundSome = !isError && renderedList && renderedList?.docs.length > 0;

  return (
    <Container fluid>
      <ol>
        {searchHistory.length > 0 && (
          <>
            <p>История запросов:</p>
            {searchHistory
              .map((query) => new URLSearchParams(query))
              .map((params) => {
                return [
                  { paramName: 'name', label: 'Название' },
                  { paramName: 'countries.name', label: 'Страны' },
                  { paramName: 'year', label: 'Года' },
                  { paramName: 'ageRating', label: 'Возрастной рейтинг' },
                ]
                  .filter((r) => params.get(r.paramName))
                  .map((r) => `${r.label}: ${params.getAll(r.paramName)}`)
                  .join(' | ');
              })
              .map((record, idx) => (
                <li key={`${record}-${idx}`}>{record}</li>
              ))}
          </>
        )}
      </ol>
      {searchHistory.length > 0 && (
        <Button className="mb-4" onClick={onClearHistory}>
          Очистить историю
        </Button>
      )}
      <Button className="d-block mb-4" onClick={onCopyShareLink}>
        Скопировать ссылку на выдачу
      </Button>
      {linkCopyStatus && (
        <p
          className={classNames('mb-4', {
            'text-success': linkCopyStatus === 'success',
            'text-danger': linkCopyStatus === 'error',
          })}
        >
          {linkCopyStatus === 'success'
            ? 'Ссылка скопирована в буфер обмена'
            : 'Не удалось скопировать ссылку.'}
        </p>
      )}
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
            onChange={onPerPageChange}
            value={itemsPerPage}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Поиск фильмов и сериалов по названию</FormLabel>
          <FormControl
            placeholder="Введите поисковой запрос..."
            type="text"
            value={name}
            onChange={onNameChange}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Фильтры:</FormLabel>
          <Row className="px-3 gap-2 justify-content-center">
            <Col xs="12" lg="auto" className="d-flex gap-2 align-items-center">
              Года:
              <FormControl
                id="search-year-left"
                onChange={onYearLeftChange}
                type="number"
                placeholder="от"
                min={minYear}
                max={maxYear}
                value={yearLeft}
              />
              <FormControl
                id="search-year-right"
                onChange={onYearRightChange}
                type="number"
                placeholder="до"
                min={minYear}
                max={maxYear}
                value={yearRight}
              />
            </Col>
            <Col xs="12">
              <Select
                className="w-100"
                isMulti
                onChange={onCountryChange}
                placeholder="Страны производства"
                options={countries.map(({ name }) => ({
                  label: name,
                  value: name,
                }))}
                noOptionsMessage={() => 'Стран не найдено'}
                styles={{
                  menu: (base) => ({ ...base, zIndex: '999!important' }),
                }}
                value={countries
                  .filter(({ name }) => pickedCountriesSet.has(name))
                  .map(({ name }) => ({ label: name, value: name }))}
                defaultValue={countries
                  .filter(({ name }) => pickedCountriesSet.has(name))
                  .map(({ name }) => ({ label: name, value: name }))}
              />
            </Col>
            <Col xs="12">
              <Select
                className="w-100"
                isMulti
                onChange={onAgeRatingChange}
                placeholder="Возрастной рейтинг"
                options={ageRatings.map((r) => ({ label: r, value: r }))}
                noOptionsMessage={() => 'Значений не найдено'}
                styles={{
                  menu: (base) => ({ ...base, zIndex: '999!important' }),
                }}
                value={ageRatings
                  .filter((r) => pickedRatingsSet.has(String(r)))
                  .map((r) => ({ label: r, value: r }))}
                defaultValue={ageRatings
                  .filter((r) => pickedRatingsSet.has(String(r)))
                  .map((r) => ({ label: r, value: r }))}
              />
            </Col>
          </Row>
        </FormGroup>
        {renderedList && (
          <BigPagination
            entityName="moviesPagination"
            className="justify-content-center"
            currentPage={currentPage || 1}
            itemsPerPage={itemsPerPage}
            pagesCount={renderedList.pages}
            onPageChange={setCurrentPage}
          />
        )}
      </Form>
      {isFetching ? (
        <Spinner />
      ) : (
        <ul className="d-flex flex-wrap justify-content-center list-unstyled gap-4">
          {foundSome
            ? renderedList.docs.map((movie) => (
                <li key={movie.id}>
                  <MovieCard
                    className="h-100"
                    movie={movie}
                    query={`?page=${currentPage}&limit=${itemsPerPage}${query}`}
                  />
                </li>
              ))
            : !isError &&
              'По введёным фильтрам на текущей странице фильмов и сериалов не найдено'}
        </ul>
      )}
      {isError && (
        <p className="text-danger fs-3">
          Ошибка загрузки фильмов, повторите позже или измените фильтры.
        </p>
      )}
    </Container>
  );
};
