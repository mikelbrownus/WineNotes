import NoteMapper from '../model/note-mapper';
import initialState from '../initialState.json';

describe('Note mapper tests', () => {
  it('Mapper.getName should not be null', () => {
    const noteMapper = NoteMapper(initialState.WineNotes[0]);
    expect(noteMapper.getName()).not.toBeNull();
  });

  it('Mapper.getName should be correct', () => {
    const noteMapper = NoteMapper(initialState.WineNotes[2]);
    expect(noteMapper.getName()).toEqual('Drouhin Roserock Chardonnay Eola-Amity Hills 2016');
  });

  it('Mapper.getName should not include "blend" in name', () => {
    const noteMapper = NoteMapper(initialState.WineNotes[1]);
    expect(noteMapper.getName()).toEqual('Robert Mondavi Fumé Blanc Oakville 2014');
  });

  it('Mapper.getName should not include vintage if nonvintage is true', () => {
    const noteMapper = NoteMapper(initialState.WineNotes[3]);
    expect(noteMapper.getName()).toEqual('Thierry Triolet Brut Champagne ');
  });
});
