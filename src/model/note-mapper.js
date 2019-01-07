const NoteMapper = note => ({
  getDate: () => note.date,
  getName: () => note.name,
});

export default NoteMapper;
