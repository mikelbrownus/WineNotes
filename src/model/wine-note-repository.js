const WineNoteRepository = () => {
  let wineNotes = [];
  return {
    getNotes: () => wineNotes,
    setNotes: (notes) => { wineNotes = notes; },
  };
};

export default WineNoteRepository;
