// @flow

declare var module: {
  hot: {
    accept(path: strng, callback: () => void): void
  }
};