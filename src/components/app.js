import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './header';
import Footer from './footer';
import WineNotes from './wine-notes/wine-notes';
import initialState from '../initialState.json';


const App = () => (
  <Fragment>
    <CssBaseline />
    <Header />
    <WineNotes notes={initialState.WineNotes} />
    <Footer />
  </Fragment>
);

export default App;
