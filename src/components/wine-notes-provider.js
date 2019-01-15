import React from 'react';
import WineNoteRepository from '../model/wine-note-repository';
import Context from '../app-context';
import initialState from '../initialState.json';

// const Context = React.createContext();
const repository = WineNoteRepository();
repository.setNotes(initialState.WineNotes);

class WineNotesProvider extends React.Component {
state = {
  WineNotes: repository.getNotes(),
}

render() {
  const { children } = this.props;
  return (
    <Context.Provider value={{
      state: this.state,
    }}
    >
      {children}
    </Context.Provider>
  );
}
}
export default WineNotesProvider;
