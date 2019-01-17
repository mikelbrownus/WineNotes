import WineNoteRepository from '../model/wine-note-repository';
import initialState from '../initialState.json';

const repository = WineNoteRepository();
repository.setNotes(initialState.WineNotes);

describe('WineNoteRepository tests', () => {
  it('repository.getNotes().length should be 4', () => {
    expect(repository.getNotes().length).toEqual(4);
  });

  it('wine note ID should be UUID', () => {
    const uuidPattern = /^[0-9A-F]{8}-[0-9A-F]{4}-[1][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
    expect(repository.getNotes()[0].id).toMatch(uuidPattern);
  });
});
