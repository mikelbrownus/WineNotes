import uuidv1 from 'uuid/v1';

const WineNoteRepository = () => {
  const wineNotes = [];
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

  return {
    getNotes: () => wineNotes,
    insert,
    setNotes,
    getNote,
  };
};

export default WineNoteRepository;
