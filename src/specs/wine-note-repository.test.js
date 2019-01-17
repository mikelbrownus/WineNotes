import WineNoteRepository from '../model/wine-note-repository';
import initialState from '../initialState.json';

const repository = WineNoteRepository();
repository.setNotes(initialState.WineNotes);

describe('WineNoteRepository tests', () => {
  it('repository.getNotes().length should be 4', () => {
    expect(repository.getNotes().length).toEqual(4);
  });
});
