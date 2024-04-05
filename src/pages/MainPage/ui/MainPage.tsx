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
  Spinner,
} from 'react-bootstrap';
import { useDebounce } from '@shared/lib/useDebounce';

export const MainPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useDebounce('', 1000);

  const { data: mainList, isFetching: isFetchingMainList } = useGetMoviesQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  const { data: searchedList, isFetching: isFetchingSearchedList } =
    useSearchMovieQuery(
      {
        limit: itemsPerPage,
        query: searchValue,
        page: currentPage,
      },
      { skip: !searchValue.length },
    );

  const total = 100;

  const renderedList = searchValue.length > 0 ? searchedList : mainList;

  return (
    <Container>
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
          <FormLabel>Поиск по названию</FormLabel>
          <FormControl
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
          />
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
          {renderedList?.docs.map((movie) => (
            <li key={movie.id}>
              <MovieCard className="h-100" movie={movie} />
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
};
