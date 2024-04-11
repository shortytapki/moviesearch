import { MOVIE_SEARCH_QUERY_HISTORY } from '@shared/consts/consts';

const SAVED_QUERIES_AMOUNT = 20;
export const REFETCH_ATTEMPTS = 3;

export const getQueryString = (param: string, value: string | string[]) => {
  if (!value || !value.length) return '';
  if (typeof value === 'object') {
    const separator = `&${param}=%2B`;
    const joined = value.join(separator);
    return value.length > 1 ? `${param}=%2B` + joined : `${param}=${value}`;
  }
  return `${param}=${value}`;
};

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
