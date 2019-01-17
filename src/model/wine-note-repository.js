import uuidv1 from 'uuid/v1';

const WineNoteRepository = () => {
  let wineNotes = [];
  const setNotes = (notes) => {
    notes.forEach((note) => {
      const newNote = note;
      newNote.id = uuidv1();
      wineNotes.push(newNote);
    });
  };

  const insert = (note) => {
    const newNote = note;
    newNote.id = uuidv1();
    wineNotes.push(note);
  };

  const getNote = id => wineNotes.filter(note => id === note.id)[0];

  const update = (id, newProperties) => {
    const updatedNote = Object.assign(getNote(id), newProperties);
    wineNotes = wineNotes.map(note => ((note.id === updatedNote.id) ? updatedNote : note));
  };

  return {
    getNotes: () => wineNotes,
    insert,
    setNotes,
    getNote,
    update,
  };
};

export default WineNoteRepository;
