import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import Route from 'react-router-dom/Route';
import Header from './header';
import Footer from './footer';
import WineNotes from './wine-notes/wine-notes';
import Help from './help/help';
import Collections from './collections/collections';
import Settings from './settings/settings';
import WineNoteView from './wine-notes/wine-note-view';

const App = () => (
  <BrowserRouter basename="/WineNotes">
    <Fragment>
      <CssBaseline />
      <Header />
      <Route exact path="/" component={WineNotes} />
      <Route exact path="/view" component={WineNoteView} />
      <Route path="/settings" component={Settings} />
      <Route path="/help" component={Help} />
      <Route path="/collections" component={Collections} />
      <Footer />
    </Fragment>
  </BrowserRouter>
);

export default App;
