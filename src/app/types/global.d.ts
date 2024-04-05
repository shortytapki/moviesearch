declare const API_TOKEN: string;
declare const API_URL: string;

declare module '*.css' {
  type IClassnames = Record<string, string>;
  const classNames: IClassnames;
  export = classNames;
}
