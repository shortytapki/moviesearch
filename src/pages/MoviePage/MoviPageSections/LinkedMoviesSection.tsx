import type { Movie } from '@entities/Movie';
import { RouteParams, RoutePaths } from '@shared/config/routeConfig';
import { Carousel, Image } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
interface LinkedMoviesProps {
  movie: Movie;
}

export const LinkedMovies = ({ movie }: LinkedMoviesProps) => {
  const { similarMovies } = movie;
  return (
    <section>
      <h2 className="text-center">Похожие фильмы и сериалы</h2>
      {similarMovies ? (
        <Row className="justify-content-center">
          <Carousel className="w-50">
            {similarMovies.map((sm) => {
              const { enName, alternativeName, name, poster } = sm;

              const formattedName = name || enName || alternativeName || '';

              return (
                <Carousel.Item key={sm.id}>
                  <Link
                    to={RoutePaths.movie.replace(
                      RouteParams.movieId,
                      String(sm.id),
                    )}
                  >
                    <Image
                      className="w-100"
                      src={poster?.url || poster?.previewUrl || ''}
                      alt={`Постер фильма ${formattedName} не найден.`}
                    />
                  </Link>
                  <Carousel.Caption>
                    <p className="fs-3">{formattedName}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </Row>
      ) : (
        'Похожих фильмов или сериалов не найдено.'
      )}
    </section>
  );
};
