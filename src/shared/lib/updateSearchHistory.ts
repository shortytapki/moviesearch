import { MOVIE_SEARCH_QUERY_HISTORY, SAVED_QUERIES_AMOUNT } from '../consts';

export const updateLastQueryHistory = (q?: string) => {
  const historyString = localStorage.getItem(MOVIE_SEARCH_QUERY_HISTORY);
  const history: string[] = historyString ? JSON.parse(historyString) : [];
  if (!q) return history;
  const newHistory = history
    .slice(history.length === SAVED_QUERIES_AMOUNT ? 1 : 0)
    .concat([q]);
  localStorage.setItem(MOVIE_SEARCH_QUERY_HISTORY, JSON.stringify(newHistory));
  return newHistory;
};
