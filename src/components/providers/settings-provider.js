// https://dev.to/oieduardorabelo/react-hooks-how-to-create-and-update-contextprovider-1f68
import React, { useEffect } from 'react';
import localForage from 'localforage';

const SettingsContext = React.createContext();

let initialState = {
  autoInsertOn: false,
  wineMaker: '',
  tastingNotes: '',
  technicalNotes: '',
  nameOrder: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'reset':
      return initialState;
    case 'update-auto-insert':
      return { ...state, autoInsertOn: action.payload };
    case 'update-winemaker':
      return { ...state, wineMaker: action.payload };
    case 'update-tastingnotes':
      return { ...state, tastingNotes: action.payload };
    case 'update-technicalnotes':
      return { ...state, technicalNotes: action.payload };
    case 'update-nameorder':
      return { ...state, nameOrder: action.payload };
    default:
      return state;
  }
};

function SettingsContextProvider(props) {
  localForage.getItem('settings').then(value => {
    if (value) {
      const settings = JSON.parse(value);
      initialState = settings;
    }
  });
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };

  useEffect(
    () => {
      localForage.setItem('settings', JSON.stringify(state));
    },
    [state],
  );
  const { children } = props;
  return (
    <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
  );
}

const SettingsContextConsumer = SettingsContext.Consumer;

export { SettingsContext, SettingsContextProvider, SettingsContextConsumer };
