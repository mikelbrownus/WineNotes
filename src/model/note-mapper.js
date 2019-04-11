const NoteMapper = note => {
  const getName = (order) => {
    const maker = note.maker ? `${note.maker} ` : '';
    const name = note.wineName ? `${note.wineName} ` : '';
    const varietal = note.varietal && !note.varietal.startsWith('Blend')
      ? `${note.varietal} `
      : '';
    const region = note.region ? `${note.region} ` : '';
    const vintage = note.vintage && note.nonvintage === false ? `${note.vintage} ` : '';
    switch (order) {
      case 1:
        return vintage + maker + name + varietal + region;
      case 2:
        return name + maker + varietal + region + vintage;
      case 3:
        return maker + region + name + varietal + vintage;
      default:
        return maker + name + varietal + region + vintage;
    }
  };
  return {
    getDate: () => new Date(note.date).toLocaleDateString(),
    getName,
  };
};

export default NoteMapper;
