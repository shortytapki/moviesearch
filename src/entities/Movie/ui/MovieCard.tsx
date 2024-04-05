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
}

export const MovieCard = ({ className, movie }: MovieCardProps) => {
  const { name, logo, poster, id, backdrop, year, alternativeName } = movie;
  return (
    <Card className={classNames(className)}>
      <CardImg
        variant="top"
        style={{ maxHeight: 500 }}
        src={
          poster.previewUrl ||
          poster.url ||
          logo.url ||
          backdrop.previewUrl ||
          backdrop.url
        }
      />
      <CardBody>
        <Link to={RoutePaths.movie.replace(RouteParams.movieId, String(id))}>
          <CardText className="text-muted">
            {alternativeName ? `${name} | ${alternativeName}` : name} ({year})
          </CardText>
        </Link>
      </CardBody>
    </Card>
  );
};
