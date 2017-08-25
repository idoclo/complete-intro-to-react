import reducers from '../reducers';

describe('SET_SEARCH_TERM', () => {

  it('updates Redux searchTerm state to "black" when an action is fired off with this payload', () => {
    const state = reducers({searchTerm:'',apiData:{}}, {type:'SET_SEARCH_TERM',payload:'black'});
    expect(state).toEqual({searchTerm:'black',apiData:{}});  
  });

  it('updates Redux searchTerm state to "silicon" when an action is fired off with this payload', () => {
    const state = reducers({searchTerm: '', apiData: {}}, {type: 'SET_SEARCH_TERM', payload: 'silicon'});
    expect(state).toEqual({searchTerm: 'silicon', apiData: {}});
  });

});


describe('ADD_API_DATA', () => {
  
  it('updates Redux apiData when action fired off with an action', () => {
    let state;
    state = reducers(
      { searchTerm: 'black', apiData: {} },
      {
        type: 'ADD_API_DATA',
        payload: {
          rating: '1.5',
          title: 'Black Mirror',
          year: '2011–',
          description: 'A television anthology series that shows the dark side of life and technology.',
          poster: 'bm.jpg',
          imdbID: 'tt2085059',
          trailer: 'jDiYGjp5iFg'
        }
      }
    );
    expect(state).toEqual({
      searchTerm: 'black',
      apiData: {
        tt2085059: {
          rating: '1.5',
          title: 'Black Mirror',
          year: '2011–',
          description: 'A television anthology series that shows the dark side of life and technology.',
          poster: 'bm.jpg',
          imdbID: 'tt2085059',
          trailer: 'jDiYGjp5iFg'
        }
      }
    });
  });

  it('Changes from one ShowCard to another correctly and updates the state with corresponding rating', () => {
    let state;
    state = reducers(
      {
        searchTerm: 'black',
        apiData: {
          tt2085059: {
            rating: '1.5',
            title: 'Black Mirror',
            year: '2011–',
            description: 'A television anthology series that shows the dark side of life and technology.',
            poster: 'bm.jpg',
            imdbID: 'tt2085059',
            trailer: 'jDiYGjp5iFg'
          }
        }
      },
      {
        type: 'ADD_API_DATA',
        payload: {
          rating: '6.3',
          title: 'Orange Is the New Black',
          year: '2013–',
          description:
            'The story of Piper Chapman, a woman in her thirties who is sentenced to fifteen months in prison after being convicted of a decade-old crime of transporting money for her drug-dealing girlfriend.',
          poster: 'oitnb.jpg',
          imdbID: 'tt2372162',
          trailer: 'th8WT_pxGqg'
        }
      }
    );
    expect(state).toEqual({
      searchTerm: 'black',
      apiData: {
        tt2372162: {
          rating: '6.3',
          title: 'Orange Is the New Black',
          year: '2013–',
          description:
            'The story of Piper Chapman, a woman in her thirties who is sentenced to fifteen months in prison after being convicted of a decade-old crime of transporting money for her drug-dealing girlfriend.',
          poster: 'oitnb.jpg',
          imdbID: 'tt2372162',
          trailer: 'th8WT_pxGqg'
        }
      }
    });
  });

});