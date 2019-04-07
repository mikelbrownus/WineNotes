import uuidv1 from 'uuid/v1';
import clone from 'ramda/src/clone';

const WineNoteRepository = () => {
  let wineNotes = [];
  // this is for testing purposes only
  const setNotes = notes => {
    notes.forEach(note => {
      const randomDaysOld = Math.floor(Math.random() * 6) + 1;
      const dayOffSet = 24 * 60 * 60 * 1000;
      const newNote = clone(note);
      newNote.id = uuidv1();
      newNote.date = new Date(Date.now() - dayOffSet * randomDaysOld);
      wineNotes.push(newNote);
    });
  };

  const insert = note => {
    const newNote = clone(note);
    newNote.date = new Date();
    newNote.id = uuidv1();
    wineNotes.push(newNote);
  };

  const getNote = id => wineNotes.filter(note => id === note.id)[0];

  const update = (id, newProperties) => {
    const updatedNote = Object.assign(clone(getNote(id)), newProperties);
    wineNotes = wineNotes.map(note => (note.id === updatedNote.id ? updatedNote : note));
  };

  const deleteNote = id => {
    wineNotes = wineNotes.filter(note => note.id !== id);
  };
  const laterDate = (note1, note2) => note2.date - note1.date;

  const filteredNotes = filter => {
    const notes = wineNotes;
    if (filter) {
      const filterLowerCase = filter.toLowerCase();
      return notes
        .filter(note => !note.collection === true)
        .filter(
          note => note.varietal.toLowerCase().includes(filterLowerCase)
            || (note.vintage.toLowerCase().includes(filterLowerCase)
              && !note.nonvintage)
            || note.wineName.toLowerCase().includes(filterLowerCase)
            || note.region.toLowerCase().includes(filterLowerCase)
            || note.maker.toLowerCase().includes(filterLowerCase),
        )
        .sort(laterDate);
    }
    return notes.sort(laterDate);
  };

  return {
    getNotes: () => wineNotes,
    insert,
    setNotes,
    setWineNotes: notes => {
      wineNotes = notes;
    },
    getNote,
    update,
    deleteNote,
    deleteAll: () => {
      wineNotes = [];
    },
    filteredNotes,
  };
};

export default WineNoteRepository;
