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
        <Route exact path="/" render={(props) => <WineNotes {...props} />} />
        <Route exact path="/view" render={(props) => <WineNoteView {...props} />} />
        <Route exact path="/settings" render={(props) => <Settings {...props} />} />
        <Route exact path="/help" render={() => <Help />} />
        <Route exact path="/collections" render={(props) => <Collections {...props} />} />
        <Route exact path="/collectionsView" render={(props) => <CollectionView {...props} />} />
        <Route render={() => <PageNotFound />} />
      </Switch>
      <Footer />
    </Fragment>
  </BrowserRouter>
);

export default App;
