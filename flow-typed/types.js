// @flow

export type Show = {
  title: string,
  year: string,
  description: string,
  poster: string,
  imdbID: string,
  trailer: string,
  rating?: string
};

declare var module: {
  hot: {
    accept(path: strng, callback: () => void): void
  }
};


// These two types on lines 20 and 22 are purely for internal use inside this types file.
declare type ActionType = 'SET_SEARCH_TERM' | 'ADD_API_DATA';

// Angle brackets are like parameters that you are giving to that particular item
declare type ActionT<A: ActionType, P> = {|
  type: A,
  payload: P
|};

export type Action = ActionT<'SET_SEARCH_TERM', string> | ActionT<'ADD_API_DATA', Show>; // Show is a show {}