import {
  Card,
  CardBody,
  CardImg,
  type CardProps,
  CardText,
} from 'react-bootstrap';
import type { Movie } from '../model/types/movie';
import { Link } from 'react-router-dom';
import { RouteParams, RoutePaths } from '@shared/config/routeConfig';
import classNames from 'classnames';

interface MovieCardProps extends CardProps {
  movie: Movie;
  query: string;
}

export const MovieCard = ({ className, movie, query }: MovieCardProps) => {
  const { name, logo, poster, id, backdrop, year, alternativeName, rating } =
    movie;
  return (
    <Card className={classNames(className)}>
      <CardImg
        variant="top"
        style={{ maxHeight: 500 }}
        src={
          poster?.previewUrl ||
          poster?.url ||
          logo?.url ||
          backdrop?.previewUrl ||
          backdrop?.url ||
          ''
        }
        alt={`Постер фильм ${name} не найден...`}
      />
      <CardBody>
        <Link
          state={{ query }}
          to={RoutePaths.movie.replace(RouteParams.movieId, String(id))}
        >
          <CardText>
            {alternativeName && name
              ? `${name} | ${alternativeName}`
              : name || alternativeName}{' '}
            ({year})
          </CardText>
        </Link>
        <CardText className="text-secondary">
          КП: {rating.kp}, IMDB: {rating.imdb}
        </CardText>
      </CardBody>
    </Card>
  );
};
