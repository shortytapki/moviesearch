import type { Movie } from '@entities/Movie';
import { Pagination } from '@shared/ui';

interface ActorsSectionProps {
  currentPage: number;
  onPageChange: (item: number) => void;
  itemsPerPage: number;
  movie: Movie;
}

export const ActorsSection = ({
  movie,
  currentPage,
  onPageChange,
  itemsPerPage,
}: ActorsSectionProps) => {
  const actorsPaginationStart = (currentPage - 1) * currentPage;
  const persons = movie.persons;

  const actorsCurrentList =
    persons.length > 10
      ? persons.slice(
          actorsPaginationStart,
          actorsPaginationStart + itemsPerPage,
        )
      : persons;
  return (
    <section>
      <h2 className="text-center">Актёры</h2>
      {persons.length > 10 && (
        <Pagination
          className="justify-content-center"
          entityName="actorsPagination"
          pagesCount={persons.length}
          currentPage={currentPage}
          onPageChange={onPageChange}
          itemsPerPage={itemsPerPage}
        />
      )}
      {persons.length > 0 ? (
        <ol className="list-unstyled">
          {actorsCurrentList.map((p, idx) => (
            <li key={p.name} className="text-center">
              {idx + 1 + itemsPerPage * (currentPage - 1)}. {p.name ?? p.enName}
            </li>
          ))}
        </ol>
      ) : (
        'Нет информации об актёрах...'
      )}
    </section>
  );
};
