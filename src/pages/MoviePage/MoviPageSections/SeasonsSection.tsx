import type { Movie } from '@entities/Movie';
import { Pagination } from '@shared/ui';

interface SeasonsSectionProps {
  movie: Movie;
  onPageChange: (item: number) => void;
  currentPage: number;
}

export const SeasonsSection = ({
  movie,
  onPageChange,
  currentPage,
}: SeasonsSectionProps) => {
  const seasonsInfo = movie.seasonsInfo;
  const currentInfo = seasonsInfo.at(currentPage - 1);
  return (
    <section>
      <h2 className="text-center">Сезоны</h2>
      <Pagination
        entityName="seasonsPagination"
        total={seasonsInfo.length}
        itemsPerPage={1}
        onPageChange={onPageChange}
        currentPage={currentPage}
        className="justify-content-center"
      />
      <p className="text-center">
        Сезон: {currentInfo?.number ?? '-'}, серий:{' '}
        {currentInfo?.episodesCount ?? '-'}
      </p>
    </section>
  );
};
