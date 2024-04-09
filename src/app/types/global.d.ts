declare const API_TOKEN: string;
declare const API_URL: string;
declare const AUTH_SERVER_URL: string;

declare module '*.css' {
  type IClassnames = Record<string, string>;
  const classNames: IClassnames;
  export = classNames;
}
