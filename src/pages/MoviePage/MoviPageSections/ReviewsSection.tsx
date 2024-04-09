import type { Movie } from '@entities/Movie';
import classNames from 'classnames';

interface ReviewsSectionProps {
  className?: string;
  movie: Movie;
}

export const ReviewsSection = ({ className, movie }: ReviewsSectionProps) => {
  const { reviewInfo } = movie;
  const hasReviews =
    reviewInfo?.count || reviewInfo?.percentage || reviewInfo?.positiveCount;
  return (
    <section className={classNames('text-center', className)}>
      <h2>Отзывы:</h2>
      {hasReviews ? (
        <>
          {reviewInfo?.count && <p>Всего: {reviewInfo?.count}</p>}
          {reviewInfo?.positiveCount && (
            <p>Положительных: {reviewInfo?.positiveCount}</p>
          )}
          {reviewInfo?.percentage && <p>Процент: {reviewInfo?.percentage}%</p>}
        </>
      ) : (
        'Отзывов пока нет...'
      )}
    </section>
  );
};
