import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Switch, BrowserRouter } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Header from './header';
import Footer from './footer';
import WineNotes from './wine-notes/wine-notes';
import Help from './help/help';
import Collections from './collections/collections';
import Settings from './settings/settings';
import WineNoteView from './wine-notes/wine-note-view';
import CollectionView from './collections/collection-view';
import PageNotFound from './error/page-not-found';

const App = () => (
  <BrowserRouter basename="/WineNotes">
    <Fragment>
      <CssBaseline />
      <Header />
      <Switch>
        <Route exact path="/" component={WineNotes} />
        <Route exact path="/view" component={WineNoteView} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/help" component={Help} />
        <Route exact path="/collections" component={Collections} />
        <Route exact path="/collectionsView" component={CollectionView} />
        <Route component={PageNotFound} />
      </Switch>
      <Footer />
    </Fragment>
  </BrowserRouter>
);

export default App;
