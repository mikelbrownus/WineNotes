import React from 'react';
import localForage from 'localforage';
import WineNoteRepository from '../model/wine-note-repository';
import CollectionRepository from '../model/collection-repository';
import Context from '../app-context';
import initialState from '../initialState.json';

const repository = WineNoteRepository();
const collectionsRepository = CollectionRepository();

class WineNotesProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      WineNotes: repository.filteredNotes(),
      Collections: [],
      CurrentCollection: {},
      editDialogOpen: false,
      editCollectionDialogOpen: false,
      addTestData: this.addTestData,
      deleteNote: this.deleteNote,
      filterNotes: this.filterNotes,
      editNoteDialogToggle: this.editNoteDialogToggle,
      editCollectionDialogToggle: this.editCollectionDialogToggle,
      setNoteDialog: this.setNoteDialog,
      updateNote: this.updateNote,
      addNote: this.addNote,
      addCollection: this.addCollection,
      deleteCollection: this.deleteCollection,
      updateCollection: this.updateCollection,
      setCurrentCollection: (collection) => {
        this.setState({
          CurrentCollection: collection,
        });
      },
    };
  }

  componentDidMount() {
    localForage.getItem('wineNotes').then(value => {
      if (value) {
        const notes = JSON.parse(value);
        repository.setWineNotes(notes);
        this.setState({
          WineNotes: repository.filteredNotes(),
        });
      }
    });
    localForage.getItem('collections').then(value => {
      if (value) {
        const Collections = JSON.parse(value);
        collectionsRepository.setCollections(Collections);
        this.setState({
          Collections,
        });
      }
    });
  }

  addTestData = () => {
    if (repository.getNotes().length === 0) {
      repository.setNotes(initialState.WineNotes);
    } else {
      repository.deleteAll();
      repository.setNotes(initialState.WineNotes);
    }

    this.setState(() => ({
      WineNotes: repository.filteredNotes(),
    }));
  };

  deleteNote = id => {
    repository.deleteNote(id);
    this.setState(() => ({
      WineNotes: repository.filteredNotes(),
    }));
    localForage.setItem('wineNotes', JSON.stringify(repository.getNotes()));
  };

  filterNotes = filter => {
    this.setState(() => ({
      WineNotes: repository.filteredNotes(filter),
    }));
  };

  editNoteDialogToggle = () => {
    this.setState(prevState => ({
      editDialogOpen: !prevState.editDialogOpen,
    }));
  };

  editCollectionDialogToggle = () => {
    this.setState(prevState => ({
      editCollectionDialogOpen: !prevState.editCollectionDialogOpen,
    }));
  };

  setNoteDialog = open => {
    this.setState(() => ({
      editDialogOpen: open,
    }));
  };

  updateNote = (id, changes) => {
    repository.update(id, changes);
    this.setState(() => ({
      WineNotes: repository.filteredNotes(),
    }));
    localForage.setItem('wineNotes', JSON.stringify(repository.getNotes()));
  };

  addNote = note => {
    repository.insert(note);
    this.setState(() => ({
      WineNotes: repository.filteredNotes(),
    }));
    localForage.setItem('wineNotes', JSON.stringify(repository.getNotes()));
  };

  addCollection = collection => {
    collectionsRepository.addCollection(collection);
    this.updateCollectionState();
  }

  deleteCollection = id => {
    this.setState({
      CurrentCollection: {},
    });
    collectionsRepository.deleteCollection(id);
    const notes = repository.getNotes();
    notes.forEach((note) => {
      if (note.collection === id) {
        this.deleteNote(note.id);
      }
    });
    this.updateCollectionState();
  }

  updateCollection = collection => {
    collectionsRepository.updateCollection(collection.id, collection);
    this.setState({
      CurrentCollection: collection,
    });
    this.updateCollectionState();
  }

  updateCollectionState = () => {
    this.setState(() => ({
      Collections: collectionsRepository.getCollections(),
    }));
    localForage.setItem('collections', JSON.stringify(collectionsRepository.getCollections()));
  }

  render() {
    const { children } = this.props;
    return (
      <Context.Provider
        value={{
          state: this.state,
        }}
      >
        {children}
      </Context.Provider>
    );
  }
}
export default WineNotesProvider;
