export const getQueryString = (param: string, value: string | string[]) => {
  if (!value || !value.length) return '';
  if (typeof value === 'object') {
    const separator = `&${param}=%2B`;
    const joined = value.join(separator);
    return value.length > 1 ? `${param}=%2B` + joined : `${param}=${value}`;
  }
  return `${param}=${value}`;
};
