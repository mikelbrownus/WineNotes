import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import WineNotes from './wine-notes/wine-notes';
import Help from './help/help';
import Collections from './collections/collections';
import Settings from './settings/settings';
import initialState from '../initialState.json';
import WineNoteView from './wine-notes/wine-note-view';


const App = () => (
  <BrowserRouter>
    <Fragment>
      <CssBaseline />
      <Header />
      <Route exact path="/" render={() => <WineNotes notes={initialState.WineNotes} />} />
      <Route exact path="/view" component={WineNoteView} />
      <Route path="/settings" component={Settings} />
      <Route path="/help" component={Help} />
      <Route path="/collections" component={Collections} />
      <Footer />
    </Fragment>
  </BrowserRouter>
);

export default App;
