const WineNoteMapper = note => ({
  getDate: () => note.date,
  getName: () => note.name,
});

export default WineNoteMapper;
