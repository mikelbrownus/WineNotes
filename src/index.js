import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import App from './components/app';
import WineNotesProvider from './components/wine-notes-provider';
import { SettingsContextProvider } from './components/providers/settings-provider';
import { CollectionContextProvider } from './components/providers/collection-provider';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#990012',
    },
    secondary: {
      main: '#E0A838',
    },
    type: 'light',
  },
  typography: {
    useNextVariants: true,
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <WineNotesProvider>
      <CollectionContextProvider>
        <SettingsContextProvider>
          <App />
        </SettingsContextProvider>
      </CollectionContextProvider>
    </WineNotesProvider>
  </MuiThemeProvider>,
  document.getElementById('root'),
);

if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
  // production code
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js');
    });
  }
}
