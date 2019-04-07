const NoteMapper = note => {
  const getName = (order) => {
    const m = note.maker ? `${note.maker} ` : '';
    const n = note.wineName ? `${note.wineName} ` : '';
    const va = note.varietal && !note.varietal.startsWith('Blend')
      ? `${note.varietal} `
      : '';
    const r = note.region ? `${note.region} ` : '';
    const vi = note.vintage && note.nonvintage === false ? `${note.vintage} ` : '';
    switch (order) {
      case 1:
        return vi + m + n + va + r;
      case 2:
        return n + m + va + r + vi;
      case 3:
        return m + r + n + va + vi;
      default:
        return m + n + va + r + vi;
    }
  };
  return {
    getDate: () => new Date(note.date).toLocaleDateString(),
    getName,
  };
};

export default NoteMapper;
