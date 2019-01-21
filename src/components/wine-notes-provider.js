import React from 'react';
import WineNoteRepository from '../model/wine-note-repository';
import Context from '../app-context';
import initialState from '../initialState.json';

const repository = WineNoteRepository();


class WineNotesProvider extends React.Component {
  constructor(props) {
    super(props);
    this.addTestData = () => {
      if (repository.getNotes().length === 0) {
        repository.setNotes(initialState.WineNotes);
      } else {
        repository.deleteAll();
        repository.setNotes(initialState.WineNotes);
      }

      this.setState(() => ({
        WineNotes: repository.getNotes(),
      }));
    };

    this.deleteNote = (id) => {
      repository.deleteNote(id);
      this.setState(() => ({
        WineNotes: repository.getNotes(),
      }));
    };

    this.state = {
      WineNotes: repository.getNotes(),
      addTestData: this.addTestData,
      deleteNote: this.deleteNote,
    };
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
