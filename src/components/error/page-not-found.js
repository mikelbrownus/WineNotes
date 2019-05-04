import React from 'react';

const divStyle = {
  height: 'calc(100% - 116px)',
  overflowY: 'auto',
  margin: '0 auto',
  maxWidth: '650px',
};

const PageNotFound = () => (
  <div style={divStyle}>
    <h1>Oops! That page can’t be found.</h1>
    <p>
        We are unable to deliver the page requested.
        Try one of the tabs below or press back to go to the previous page.
    </p>
  </div>
);

export default PageNotFound;
