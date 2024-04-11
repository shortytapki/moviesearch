import classNames from 'classnames';
import { Card, CardBody, CardText, CardTitle } from 'react-bootstrap';
import type { Review } from '@entities/Movie';
import { BigPagination } from '@shared/ui';

interface ReviewsSectionProps {
  className?: string;
  reviews: Review[];
  pagesCount: number;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export const ReviewsSection = ({
  className,
  reviews,
  pagesCount,
  limit,
  page,
  onPageChange,
}: ReviewsSectionProps) => {
  return (
    <section className={classNames('text-center', className)}>
      <h2>Отзывы:</h2>
      {reviews.length ? (
        <>
          <BigPagination
            entityName="reviewsPaginationTop"
            pagesCount={pagesCount}
            onPageChange={onPageChange}
            currentPage={page}
            itemsPerPage={limit}
          />
          <ul className="d-flex flex-column gap-3 list-unstyled">
            {reviews.map(({ id, type, title, review, author }) => (
              <li key={id}>
                <Card>
                  <CardBody>
                    <CardTitle>
                      {title} | Автор: {author}
                    </CardTitle>
                    <CardText
                      className={classNames({
                        'text-success': type === 'Позитивный',
                        'text-danger': type === 'Отрицательный',
                      })}
                    >
                      {review}
                    </CardText>
                  </CardBody>
                </Card>
              </li>
            ))}
          </ul>
          <BigPagination
            entityName="reviewsPaginationBot"
            pagesCount={pagesCount}
            onPageChange={onPageChange}
            currentPage={page}
            itemsPerPage={limit}
          />
        </>
      ) : (
        'Отзывов пока нет...'
      )}
    </section>
  );
};
