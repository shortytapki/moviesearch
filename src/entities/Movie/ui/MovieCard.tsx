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
import type { MainPageFilters } from '@pages';

interface MovieCardProps extends CardProps {
  movie: Movie;
  search: MainPageFilters;
}

export const MovieCard = ({ className, movie, search }: MovieCardProps) => {
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
          state={{ search }}
          to={RoutePaths.movie.replace(RouteParams.movieId, String(id))}
        >
          <CardText>
            {alternativeName ? `${name} | ${alternativeName}` : name} ({year})
          </CardText>
        </Link>
        <CardText className="text-secondary">
          КП: {rating.kp}, IMDB: {rating.imdb}
        </CardText>
      </CardBody>
    </Card>
  );
};
