// @flow

import React from 'react';

const Details = function (props: {show: React.PropTypes.string.isRequired}) {
  console.log('props in details', props);
  return (
    <div className="details">
      {/* <p><pre><code>{JSON.stringify(props, null, 4)}</code></pre></p> */}
      <h1>{JSON.stringify(props.show)}</h1>
    </div>
  )
}

export default Details;