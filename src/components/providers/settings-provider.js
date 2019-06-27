// https://dev.to/oieduardorabelo/react-hooks-how-to-create-and-update-contextprovider-1f68
import React, { useEffect } from 'react';
import localForage from 'localforage';

const SettingsContext = React.createContext();

const initialState = {
  autoInsertOn: false,
  wineMaker: '',
  tastingNotes: '',
  technicalNotes: '',
  nameOrder: 0,
};

const saveState = (settings) => {
  localForage.setItem('settings', JSON.stringify(settings));
};

const reducer = (state, action) => {
  let newState;
  switch (action.type) {
    case 'reset':
      return action.payload || initialState;
    case 'update-auto-insert':
      newState = { ...state, autoInsertOn: action.payload };
      saveState(newState);
      return newState;
    case 'update-winemaker':
      newState = { ...state, wineMaker: action.payload };
      saveState(newState);
      return newState;
    case 'update-tastingnotes':
      newState = { ...state, tastingNotes: action.payload };
      saveState(newState);
      return newState;
    case 'update-technicalnotes':
      newState = { ...state, technicalNotes: action.payload };
      saveState(newState);
      return newState;
    case 'update-nameorder':
      newState = { ...state, nameOrder: action.payload };
      saveState(newState);
      return newState;
    default:
      return state;
  }
};


function SettingsContextProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };


  useEffect(
    () => {
      localForage.getItem('settings').then(saved => {
        if (saved) {
          const settings = JSON.parse(saved);
          dispatch({ type: 'reset', payload: settings });
        }
      });
    },
    [],
  );
  const { children } = props;
  return (
    <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
  );
}

const SettingsContextConsumer = SettingsContext.Consumer;

export { SettingsContext, SettingsContextProvider, SettingsContextConsumer };
