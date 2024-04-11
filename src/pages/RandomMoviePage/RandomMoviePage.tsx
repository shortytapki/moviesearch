import { useEffect, useState } from 'react';
import { Button, Container, Form, FormLabel, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useRandomMovieQuery } from '@entities/Movie';
import { getQueryString } from '@shared/lib';
import { RouteParams, RoutePaths } from '@shared/config';
import {
  COUNTRIES,
  GENRES,
  MAX_REFETCH_ATTEMPTS,
  NETWORKS,
} from '@shared/consts';

export default function RandomMoviePage() {
  const [fetchCount, setFetchCount] = useState(1);
  const [isSeries, setIsSeries] = useState(false);
  const [queryIsReady, setQueryIsReady] = useState(false);
  const [pickedNetworks, setPickedNetworks] = useState<string[]>([]);
  const [rating, setRating] = useState('');
  const [pickedCountries, setPickedCountries] = useState<string[]>([]);
  const [pickedGenres, setPickedGenres] = useState<string[]>([]);

  const isSeriesQuery = getQueryString('isSeries', String(isSeries));
  const ratingQuery = getQueryString('rating.kp', `${rating}-10`);
  const countriesQuery = getQueryString('countries.name', pickedCountries);
  const networksQuery = getQueryString('networks.items.name', pickedNetworks);
  const genresQuery = getQueryString('genres.name', pickedGenres);

  const query = [
    isSeriesQuery,
    ratingQuery,
    countriesQuery,
    networksQuery,
    countriesQuery,
    genresQuery,
  ]
    .filter(Boolean)
    .join('&');

  const navigate = useNavigate();
  const { data, isFetching, isError, refetch, error } = useRandomMovieQuery(
    query,
    { skip: !queryIsReady },
  );

  useEffect(() => {
    if (!isFetching) {
      setQueryIsReady(false);
    }
    if (data) {
      navigate(RoutePaths.movie.replace(RouteParams.movieId, String(data.id)), {
        state: {
          movie: data,
        },
      });
    }
  }, [isFetching, data]);

  useEffect(() => {
    if (isError && fetchCount < MAX_REFETCH_ATTEMPTS) {
      queryIsReady && refetch();
      setFetchCount(fetchCount + 1);
    }
  }, [isFetching, queryIsReady, isError]);

  const fullError =
    isError || Boolean(error) || fetchCount === MAX_REFETCH_ATTEMPTS;
  return (
    <Container fluid>
      <Form>
        <FormLabel className="mb-3">Фильтры:</FormLabel>
        <Select
          isMulti
          className="mb-3"
          placeholder="Страны производства"
          options={COUNTRIES.map((country) => ({
            label: country.name,
            value: country.name,
          }))}
          onChange={(picked) =>
            setPickedCountries(picked.map((option) => option.value))
          }
        />
        <Select
          isMulti
          className="mb-3"
          placeholder="Сети производства фильма"
          options={NETWORKS.map((network) => ({
            label: network,
            value: network,
          }))}
          onChange={(picked) =>
            setPickedNetworks(picked.map((option) => option.label))
          }
        />
        <Select
          isMulti
          className="mb-3"
          placeholder="Жанры"
          options={GENRES.map(({ slug, name }) => ({
            label: name,
            value: slug,
          }))}
          onChange={(picked) =>
            setPickedGenres(picked.map((option) => option.label))
          }
        />
        <Form.Check
          type="radio"
          label="Фильм"
          name="is-series-check"
          onChange={() => setIsSeries(false)}
          defaultChecked={true}
        />
        <Form.Check
          type="radio"
          label="Сериал"
          name="is-series-check"
          onChange={() => setIsSeries(true)}
          className="mb-3"
        />
        <Form.Control
          type="number"
          step={0.1}
          value={rating}
          min={0}
          max={10}
          pattern="[0-9]"
          placeholder="Рейтинг КП (пример: 7.5)"
          className="mb-3"
          onChange={(e) => setRating(e.target.value)}
        />
      </Form>
      {isFetching && !fullError ? (
        <>
          <Spinner /> выбираем {isSeries ? 'сериал' : 'фильм'}...
        </>
      ) : (
        <Button onClick={() => setQueryIsReady(true)} className="mb-3">
          Найти случайный {isSeries ? 'сериал' : 'фильм'}
        </Button>
      )}
      {fullError && (
        <p className="text-danger">
          Ошибка загрузки фильма, повторите попытку позже.
        </p>
      )}
      {!isFetching && data === null && (
        <p>По указанным фильтрам фильмов и сериалов не найдено...</p>
      )}
    </Container>
  );
}
