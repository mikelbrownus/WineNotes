import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import App from './components/app';
import WineNotesProvider from './components/wine-notes-provider';

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
      <App />
    </WineNotesProvider>
  </MuiThemeProvider>, document.getElementById('root'),
);

if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
  // production code
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js');
    });
  }
}
