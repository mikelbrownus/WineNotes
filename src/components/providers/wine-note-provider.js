import React, { useEffect, useReducer } from 'react';
import localForage from 'localforage';
import WineNoteRepository from '../../model/wine-note-repository';

const WineNoteContext = React.createContext();
const repository = WineNoteRepository();

const initialState = {
  WineNotes: [],
  editDialogOpen: false,
  editCollectionDialogOpen: false,
};

const saveState = (notes) => {
  localForage.setItem('wineNotes', JSON.stringify(notes));
};

const reducer = (state, action) => {
  let newState;
  switch (action.type) {
    case 'reset':
      return { ...state, WineNotes: repository.filteredNotes() };
    case 'note-dialog-toggle':
      newState = { ...state, editDialogOpen: action.payload };
      return newState;
    case 'collection-dialog-toggle':
      newState = { ...state, editCollectionDialogOpen: action.payload };
      return newState;
    case 'update-notes':
      repository.update(action.payload.id, action.payload.changes);
      newState = { ...state, WineNotes: repository.filteredNotes() };
      saveState(repository.getNotes());
      return newState;
    case 'add-note':
      repository.insert(action.payload);
      newState = { ...state, WineNotes: repository.filteredNotes() };
      saveState(repository.getNotes());
      return newState;
    case 'delete-note':
      repository.deleteNote(action.payload);
      newState = { ...state, WineNotes: repository.filteredNotes() };
      saveState(repository.getNotes());
      return newState;
    case 'filtered-notes':
      newState = { ...state, WineNotes: repository.filteredNotes(action.payload) };
      return newState;
    default:
      return state;
  }
};


function WineNoteContextProvider(props) {
  const [wineNotes, dispatchWineNotes] = useReducer(reducer, initialState);
  const value = { wineNotes, dispatchWineNotes };


  useEffect(
    () => {
      localForage.getItem('wineNotes').then(saved => {
        if (saved) {
          const found = JSON.parse(saved);
          repository.setWineNotes(found);
          dispatchWineNotes({ type: 'reset', payload: '' });
        }
      });
    },
    [],
  );
  const { children } = props;
  return (
    <WineNoteContext.Provider value={value}>{children}</WineNoteContext.Provider>
  );
}

const WineNoteContextConsumer = WineNoteContext.Consumer;

export { WineNoteContext, WineNoteContextProvider, WineNoteContextConsumer };
