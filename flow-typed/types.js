// @flow

export type Show = {
  title: string,
  year: string,
  description: string,
  poster: string,
  imdbID: string,
  trailer: string
};

declare var module: {
  hot: {
    accept(path: strng, callback: () => void): void
  }
};