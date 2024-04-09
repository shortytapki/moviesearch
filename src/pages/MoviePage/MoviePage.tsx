import { Link, useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import {
  Container,
  Image,
  Spinner,
  Row,
  Col,
  Carousel,
  Button,
} from 'react-bootstrap';
import { useGetMovieByIdQuery } from '@entities/Movie';
import { RoutePaths } from '@shared/config/routeConfig';
import { ActorsSection } from './MoviPageSections/ActorsSection';
import { SeasonsSection } from './MoviPageSections/SeasonsSection';
import { LinkedMovies } from './MoviPageSections/LinkedMoviesSection';
import { ReviewsSection } from './MoviPageSections/ReviewsSection';

export default function MoviePage() {
  const location = useLocation();
  const [actorsPage, setActorsPage] = useState(1);
  const [seasonsPage, setSeasonsPage] = useState(1);
  const { id: initialId } = useParams();
  const {
    data: movie,
    isSuccess,
    isFetching,
  } = useGetMovieByIdQuery(initialId || '');
  if (isFetching) return <Spinner size="sm" />;
  if (!isSuccess) return <h1>Фильм с указанным id не найден.</h1>;
  const { alternativeName, name, description, rating, poster, logo, backdrop } =
    movie;
  const formattedName =
    alternativeName && name
      ? `${name} | ${alternativeName} `
      : name || alternativeName;

  const actorsPerPage = 10;
  const posters = [poster?.previewUrl, logo?.url, backdrop?.previewUrl].filter(
    Boolean,
  );

  return (
    <Container fluid>
      <Link to={RoutePaths.main} state={{ search: location?.state?.search }}>
        <Button className="mb-5">Назад к выдаче</Button>
      </Link>
      <article className="d-flex flex-column gap-5">
        <section>
          <h1 className="text-center mb-5">{formattedName}</h1>
          <Row className="mb-5 justify-content-center align-items-center gap-5">
            <Col xs="auto" sm="auto" md="auto" lg="auto">
              <Carousel data-bs-theme="dark">
                {posters.length ? (
                  posters.map((p) => (
                    <Carousel.Item key={p}>
                      <Image
                        style={{ maxHeight: 500, maxWidth: 250 }}
                        alt={`Постер фильма ${formattedName} не найден.`}
                        src={p || ''}
                      />
                    </Carousel.Item>
                  ))
                ) : (
                  <p>Постеров не найдено</p>
                )}
              </Carousel>
            </Col>
            <Col xs="auto" sm="auto" md="auto" lg="6">
              <p className="mb-3">{description}</p>
              <ul className="text-secondary">
                <li>Рейтинг КиноПоиска: {rating.kp ?? '-'}</li>
                <li>Рейтинг IMDB: {rating.imdb ?? '-'}</li>
                <li>Рейтинг TMDB: {rating.imdb ?? '-'}</li>
                <li>Рейтинг кинокритиков: {rating.filmCritics ?? '-'}</li>
                <li>
                  Рейтинг кинокритиков из РФ: {rating.russianFilmCritics ?? '-'}
                </li>
                <li>
                  Рейтинг основанный на ожиданиях пользователей:{' '}
                  {rating.await ?? '-'}
                </li>
              </ul>
            </Col>
          </Row>
        </section>
        <ActorsSection
          movie={movie}
          itemsPerPage={actorsPerPage}
          onPageChange={setActorsPage}
          currentPage={actorsPage}
        />
        {movie?.seasonsInfo?.length > 0 && (
          <SeasonsSection
            movie={movie}
            currentPage={seasonsPage}
            onPageChange={setSeasonsPage}
          />
        )}
        <ReviewsSection movie={movie} />
        <LinkedMovies movie={movie} />
      </article>
    </Container>
  );
}
