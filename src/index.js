import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import App from './components/app';

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
    <App />
  </MuiThemeProvider>, document.getElementById('root'),
);
