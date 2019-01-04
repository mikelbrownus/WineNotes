import React from 'react';

const divStyle = {
  height: 'calc(100% - 116px)',
  overflowY: 'scroll',
  margin: '0 auto',
  maxWidth: '650px',
};

const Help = () => (
  <div style={divStyle}>
    <h2>Warning!</h2>
    <p>
      This app is an experiemental app aiming towards a full fledged
      wine tasting app using a web frontend.  There is no backend services
      associated with this app so all data will need to be stored by the
      client browser.  This means that if clear you data or your browser
      decides to clean up data there is nothing that can be done about that
      and all data will be lost.  Please use for testing purposes only.
    </p>
    <p>
      This is purely
      {' '}
      <strong>exprimental</strong>
!     Do not use for data you need to
      ensure does not get lost.
    </p>

  </div>
);

export default Help;
