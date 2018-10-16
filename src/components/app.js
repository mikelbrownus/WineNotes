import React, { Fragment } from 'react';
import Header from './header';
import Footer from './footer';
import WineNotes from './wine-notes/wine-notes';

const App = () => (
  <Fragment>
    <Header />
    <WineNotes />
    <Footer />
  </Fragment>
);

export default App;
