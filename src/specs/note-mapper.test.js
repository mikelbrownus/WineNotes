import NoteMapper from '../model/note-mapper';
import initialState from '../initialState.json';

describe('Note mapper tests', () => {
  it('Mapper.getName should not be null', () => {
    const noteMapper = NoteMapper(initialState.WineNotes[0]);
    expect(noteMapper.getName()).not.toBeNull();
  });

  it('Mapper.getName should not be correct', () => {
    const noteMapper = NoteMapper(initialState.WineNotes[2]);
    expect(noteMapper.getName()).toEqual("Drouhin Roserock Chardonnay Eola-Amity Hills 2016");
  });
});
