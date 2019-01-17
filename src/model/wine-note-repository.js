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
  return {
    getNotes: () => wineNotes,
    setNotes,
  };
};

export default WineNoteRepository;
