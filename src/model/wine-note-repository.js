import uuidv1 from 'uuid/v1';

const WineNoteRepository = () => {
  let wineNotes = [];
  const setNotes = (notes) => {
    notes.forEach((note) => {
      const newNote = JSON.parse(JSON.stringify(note));
      newNote.id = uuidv1();
      wineNotes.push(newNote);
    });
  };

  const insert = (note) => {
    const newNote = JSON.parse(JSON.stringify(note));
    newNote.date = new Date();
    newNote.id = uuidv1();
    wineNotes.push(newNote);
  };

  const getNote = id => wineNotes.filter(note => id === note.id)[0];

  const update = (id, newProperties) => {
    const updatedNote = Object.assign(JSON.parse(JSON.stringify(getNote(id))), newProperties);
    wineNotes = wineNotes.map(note => ((note.id === updatedNote.id) ? updatedNote : note));
  };

  const deleteNote = (id) => {
    wineNotes = wineNotes.filter(note => note.id !== id);
  };

  const filterNotes = filter => wineNotes.filter(note => (
    note.varietal.startsWith(filter) || (note.vintage.startsWith(filter) && !note.nonvintage)
             || note.wineName.startsWith(filter) || note.region.startsWith(filter)
             || note.maker.startsWith(filter)));

  return {
    getNotes: () => wineNotes,
    insert,
    setNotes,
    getNote,
    update,
    deleteNote,
    deleteAll: () => { wineNotes = []; },
    filterNotes,
  };
};

export default WineNoteRepository;
