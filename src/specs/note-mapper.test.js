import NoteMapper from '../model/note-mapper';
import initialState from '../initialState.json';

describe('Note mapper tests', () => {
  it('Mapper.getName should not be null', () => {
    const noteMapper = NoteMapper(initialState.WineNotes[0]);
    expect(noteMapper.getName(0)).not.toBeNull();
  });

  it('Mapper.getName default should be correct', () => {
    const noteMapper = NoteMapper(initialState.WineNotes[2]);
    expect(noteMapper.getName(0)).toEqual(
      'Drouhin Roserock Chardonnay Eola-Amity Hills 2016 ',
    );
  });

  it('Mapper.getName should case 1 be correct', () => {
    const noteMapper = NoteMapper(initialState.WineNotes[2]);
    expect(noteMapper.getName(1)).toEqual(
      '2016 Drouhin Roserock Chardonnay Eola-Amity Hills ',
    );
  });

  it('Mapper.getName should case 2 be correct', () => {
    const noteMapper = NoteMapper(initialState.WineNotes[2]);
    expect(noteMapper.getName(2)).toEqual(
      'Roserock Drouhin Chardonnay Eola-Amity Hills 2016 ',
    );
  });

  it('Mapper.getName should case 3 be correct', () => {
    const noteMapper = NoteMapper(initialState.WineNotes[2]);
    expect(noteMapper.getName(3)).toEqual(
      'Drouhin Eola-Amity Hills Roserock Chardonnay 2016 ',
    );
  });

  it('Mapper.getName should not include "blend" in name', () => {
    const noteMapper = NoteMapper(initialState.WineNotes[1]);
    expect(noteMapper.getName(0)).toEqual(
      'Robert Mondavi Fumé Blanc Oakville 2014 ',
    );
  });

  it('Mapper.getName should not include vintage if nonvintage is true', () => {
    const noteMapper = NoteMapper(initialState.WineNotes[3]);
    expect(noteMapper.getName(0)).toEqual('Thierry Triolet Brut Champagne ');
  });
});
