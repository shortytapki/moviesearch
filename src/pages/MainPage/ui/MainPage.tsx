import { useState } from 'react';
import {
  MovieCard,
  useGetMoviesQuery,
  useSearchMovieQuery,
} from '@entities/Movie';
import { Pagination } from '@shared/ui';
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
} from 'react-bootstrap';
import { useDebounce } from '@shared/lib/useDebounce';
import { countries, maxYear, minYear } from '@shared/consts/consts';

export const MainPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useDebounce('');
  const [searchYear, setSearchYear] = useDebounce('');
  const [searchCountry, setSearchCountry] = useState('');
  const [searchAgeRating, setSearchRating] = useState('');

  const filterQuery = Object.entries({
    ageRating: searchAgeRating,
    'countries.name': searchCountry,
    year: searchYear,
  })
    .filter(([_, v]) => Boolean(v))
    .reduce((acc, [k, v]) => acc + `&${k}=${v}`, '');

  const {
    data: mainList,
    isFetching: isFetchingMainList,
    isError: mainListError,
  } = useGetMoviesQuery({
    page: currentPage,
    limit: itemsPerPage,
    query: filterQuery,
  });

  const {
    data: searchedList,
    isFetching: isFetchingSearchedList,
    isError: searchedListError,
  } = useSearchMovieQuery(
    {
      limit: itemsPerPage,
      query: searchValue,
      page: currentPage,
    },
    { skip: !searchValue.length },
  );

  const apiError = mainListError || searchedListError;
  const total = 100;
  const ageRatins = ['6', '12', '16', '18'];
  const renderedList = searchValue.length > 0 ? searchedList : mainList;

  return (
    <Container fluid>
      <Form className="d-flex flex-column gap-4">
        <FormGroup>
          <FormLabel>Количество фильмов на странице</FormLabel>
          <FormControl
            type="number"
            min={1}
            max={total}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            value={itemsPerPage}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Поиск фильмов и сериалов</FormLabel>
          <FormControl
            placeholder="Введите поисковой запрос..."
            type="text"
            onChange={(e) => {
              setSearchValue(e.target.value);
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
                  onChange={(e) => setSearchYear(e.target.value)}
                  type="number"
                  placeholder="Год"
                  min={minYear}
                  max={maxYear}
                />
              </Col>
            </Col>
            <Col xs="12" lg="auto" className="flex-grow-1">
              <FormSelect
                onChange={(e) => setSearchCountry(e.target.value)}
                defaultValue="Страна"
              >
                <option>Страна</option>
                {countries.map((c) => (
                  <option defaultValue={searchCountry} value={c} key={c}>
                    {c}
                  </option>
                ))}
              </FormSelect>
            </Col>
            <Col xs="12" lg="auto" className="flex-grow-1">
              <FormSelect
                onChange={(e) => setSearchRating(e.target.value)}
                defaultValue="Возрастной рейтинг"
              >
                <option>Возрастной рейтинг</option>
                {ageRatins.map((r) => (
                  <option defaultValue={searchAgeRating} value={r} key={r}>
                    {r}+
                  </option>
                ))}
              </FormSelect>
            </Col>
          </Row>
        </FormGroup>
        <Pagination
          className="justify-content-center"
          currentPage={currentPage || 1}
          itemsPerPage={itemsPerPage}
          total={total}
          onPageChange={setCurrentPage}
        />
      </Form>
      {isFetchingMainList || isFetchingSearchedList ? (
        <Spinner />
      ) : (
        <ul className="d-flex flex-wrap justify-content-center list-unstyled gap-4">
          {renderedList && !apiError
            ? renderedList?.docs.map((movie) => (
                <li key={movie.id}>
                  <MovieCard className="h-100" movie={movie} />
                </li>
              ))
            : 'По введёным фильтрам на текущей странице фильмов не найдено'}
        </ul>
      )}
      {apiError && (
        <p className="text-danger fs-3">
          Ошибка загрузки фильмов, повторите попытку позже.
        </p>
      )}
    </Container>
  );
};
