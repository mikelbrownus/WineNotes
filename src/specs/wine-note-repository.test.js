import WineNoteRepository from '../model/wine-note-repository';
import initialState from '../initialState.json';

const repository = WineNoteRepository();
repository.setNotes(initialState.WineNotes);

describe('WineNoteRepository tests', () => {
  const uuidPattern = /^[0-9A-F]{8}-[0-9A-F]{4}-[1][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

  it('repository.getNotes().length should be 4', () => {
    expect(repository.getNotes().length).toEqual(4);
  });

  it('wine note ID should be UUID', () => {
    expect(repository.getNotes()[0].id).toMatch(uuidPattern);
  });

  it('insert should return note with correct maker and a uuid for id', () => {
    const wineNote = {
      date: '1/7/19',
      collection: null,
      varietal: '',
      vintage: '2019',
      nonvintage: false,
      maker: 'Thierry',
      region: '',
      wineName: '',
      tastingNote: '',
      technicalNote: '',
    };
    repository.insert(wineNote);
    expect(repository.getNotes()[4].maker).toMatch(wineNote.maker);
    expect(repository.getNotes()[4].id).toMatch(uuidPattern);
  });

  it('repository should get correct note from id', () => {
    const note = repository.getNotes()[3];
    expect(repository.getNote(note.id).maker).toEqual(note.maker);
    expect(repository.getNote(note.id).id).toEqual(note.id);
  });

  it('repository update should change properties of note', () => {
    const wineNoteUpdateFields = {
      date: '1/7/19',
      collection: null,
      varietal: '',
      vintage: '2019',
      nonvintage: false,
      maker: 'Thierry',
      region: '',
      wineName: '',
      tastingNote: '',
      technicalNote: '',
    };
    const note = repository.getNotes()[0];
    repository.update(note.id, wineNoteUpdateFields);
    expect(repository.getNote(note.id).maker).toEqual(wineNoteUpdateFields.maker);
    expect(repository.getNote(note.id).id).toEqual(note.id);
  });
});
