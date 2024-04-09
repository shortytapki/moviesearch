import { MOVIE_SEARCH_QUERY_HISTORY } from '@shared/consts/consts';

const SAVED_QUERIES_AMOUNT = 20;

export const createFilterQueryString = (filters: Record<string, string>) =>
  Object.entries(filters)
    .filter(([_, v]) => Boolean(v))
    .reduce((acc, [k, v]) => acc + `&${k}=${v}`, '');

export const updateLastQueryHistory = (q: string) => {
  if (!q) return;
  const historyString = localStorage.getItem(MOVIE_SEARCH_QUERY_HISTORY);
  if (historyString) {
    const history: string[] = JSON.parse(historyString);
    localStorage.setItem(
      MOVIE_SEARCH_QUERY_HISTORY,
      JSON.stringify(
        history
          .slice(history.length === SAVED_QUERIES_AMOUNT ? 1 : 0)
          .concat([q]),
      ),
    );
    return;
  }
};
