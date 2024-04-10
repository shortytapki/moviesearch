import { useRandomMovieQuery } from '@entities/Movie';
import {
  REFETCH_ATTEMPTS,
  createFilterQueryString,
} from '@pages/MainPage/utils/utils';
import { RouteParams, RoutePaths } from '@shared/config';
import { countries } from '@shared/consts';
import { genres } from '@shared/consts/consts';
import { useEffect, useState } from 'react';
import { Button, Container, Form, FormLabel, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

export default function RandomMoviePage() {
  const [fetchCount, setFetchCount] = useState(1);
  const [isSeries, setIsSeries] = useState(false);
  const [queryIsReady, setQueryIsReady] = useState(false);
  const [pickedNetworks, setPickedNetworks] = useState<string[]>([]);
  const [rating, setRating] = useState('');
  const [pickedCountries, setPickedCountries] = useState<string[]>([]);
  const [pickedGenres, setPickedGenres] = useState<string[]>([]);

  const navigate = useNavigate();
  const { data, isLoading, isError, refetch, error } = useRandomMovieQuery(
    createFilterQueryString({
      isSeries: String(isSeries),
      rating,
      'countries.name': pickedCountries.toString(),
      'networks.items.name': pickedNetworks.toString(),
      'rating.kp': rating,
      'genres.name': pickedGenres.toString(),
    }),
    { skip: !queryIsReady },
  );

  useEffect(() => {
    if (!isLoading) {
      setQueryIsReady(false);
    }
    if (data) {
      navigate(RoutePaths.movie.replace(RouteParams.movieId, String(data.id)), {
        state: {
          movie: data,
        },
      });
    }
  }, [isLoading, data]);

  useEffect(() => {
    if (isError && fetchCount < REFETCH_ATTEMPTS) {
      queryIsReady && refetch();
      setFetchCount(fetchCount + 1);
    }
  }, [isLoading, queryIsReady, isError]);

  const fullError =
    isError || Boolean(error) || fetchCount === REFETCH_ATTEMPTS;
  return (
    <Container fluid>
      <Form>
        <FormLabel className="mb-3">Фильтры:</FormLabel>
        <Select
          isMulti
          className="mb-3"
          placeholder="Страны производства"
          options={countries.map((country) => ({
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
          options={['HBO', 'Netflix', 'Amazon'].map((country) => ({
            label: country,
            value: country,
          }))}
          onChange={(picked) =>
            setPickedNetworks(picked.map((option) => option.label))
          }
        />
        <Select
          isMulti
          className="mb-3"
          placeholder="Жанры"
          options={genres.map(({ slug, name }) => ({
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
      {isLoading && !fullError ? (
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
      {!isLoading && data === null && (
        <p>По указанным фильтрам фильмов и сериалов не найдено...</p>
      )}
    </Container>
  );
}
