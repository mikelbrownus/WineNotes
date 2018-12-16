import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import WineNotes from './wine-notes/wine-notes';
import Help from './help';
import Collections from './collections';
import Settings from './settings';
import initialState from '../initialState.json';


const App = () => (
  <BrowserRouter>
    <Fragment>
      <CssBaseline />
      <Header />
      <Route exact path="/" render={() => <WineNotes notes={initialState.WineNotes} />} />
      <Route path="/settings" component={Settings} />
      <Route path="/help" component={Help} />
      <Route path="/collections" component={Collections} />
      <Footer notes={initialState.WineNotes} />
    </Fragment>
  </BrowserRouter>
);

export default App;
