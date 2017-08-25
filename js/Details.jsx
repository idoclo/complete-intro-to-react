// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAPIDetails } from './actionCreators';
import Header from './Header';
import Spinner from './Spinner';

class Details extends Component {
  // state = {
  //   apiData: { imdbRating: '' }
  // };

  componentDidMount() {
    // axios.get(`http://localhost:3000/${this.props.show.imdbID}`)
    //   .then((response: { data: { rating: string }}) => {
    //     this.setState({
    //       apiData: response.data
    //     });
    //   })
    //   .catch(error => {
    //     console.error('Error in api GET', error);  // eslint-disable-line no-console
    //   });
    if (!this.props.rating) {
      // need to request it
      this.props.getAPIData()
    }
  };
  props: {
    show: Show,
    rating: string,
    getAPIData: Function
  };
  render() {
    // console.log('props in details', props);
    const { title, description, year, poster, trailer } = this.props.show;
    let ratingComponent;
    if (this.props.rating) {
      ratingComponent = <h3>{this.props.rating}</h3>;
    } else {
      ratingComponent = <Spinner />;
    }
    return (
      <div className="details">
        {/* <pre><code>{JSON.stringify(props, null, 4)}</code></pre> */}
        {/* <h1>{title}</h1> */}
        <Header />
        <section>
          <h1>{title}</h1>
          <h2>{year}</h2>
          {ratingComponent}
          <img src={`/public/img/posters/${poster}`} alt={`Poster for ${title}`}/>
          <p>{description}</p>
        </section>
        <div>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${trailer}?rel=0&amp;controls=0&amp;showinfo=0`}
            frameBorder="0"
            allowFullScreen
            title={`Trailer for ${title}`}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => { // need ownProps to determine which api data we need to pull out of redux store
  const apiData = state.apiData[ownProps.show.imdbID] ? state.apiData[ownProps.show.imdbID] : { apiData: ''};
  return {
    rating: apiData.rating
  }
};

const mapDispatchToProps = (dispatch: Function, ownProps) => ({
  // when you call this function it will say, "What show are you?". It then grabs that show, it takes the imdbID and throw it to thunk, which then takes care of all the data requesting behind the scenes.
  getAPIData() {
    dispatch(getAPIDetails(ownProps.show.imdbID));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);