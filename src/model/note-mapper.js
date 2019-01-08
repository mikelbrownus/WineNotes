const NoteMapper = (note) => {
  const getName = () => {
    const m = (note.maker) ? `${note.maker} ` : '';
    const n = (note.wineName) ? `${note.wineName} ` : '';
    const va = (note.varietal && !note.varietal.startsWith('Blend')) ? `${note.varietal} ` : '';
    const r = (note.region) ? `${note.region} ` : '';
    const vi = (note.vintage) ? note.vintage : '';
    return m + n + va + r + vi;
  };
  return {
    getDate: () => note.date,
    getName,
  };
};

export default NoteMapper;
