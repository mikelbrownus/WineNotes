import WineNoteRepository from '../model/wine-note-repository';
import initialState from '../initialState.json';

// const repository = WineNoteRepository();
// repository.setNotes(initialState.WineNotes);
let repository;
describe('WineNoteRepository tests', () => {
  beforeEach(() => {
    repository = WineNoteRepository();
    repository.setNotes(initialState.WineNotes);
  });

  const uuidPattern = /^[0-9A-F]{8}-[0-9A-F]{4}-[1][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

  it('repository.getNotes().length should be 4', () => {
    expect(repository.getNotes().length).toEqual(4);
  });

  it('wine note ID should be UUID', () => {
    expect(repository.getNotes()[0].id).toMatch(uuidPattern);
  });

  it('insert should return note with correct maker and a uuid for id', () => {
    const wineNote = {
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


  it('insert should create a date object with current date', () => {
    const wineNote = {
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
    expect(repository.getNotes()[4].date).not.toBeUndefined();
    expect(repository.getNotes()[4].date.toLocaleString()).toEqual(new Date().toLocaleString());
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

  it('repository should delete a note', () => {
    const note = repository.getNotes()[0];
    repository.deleteNote(note.id);
    expect(repository.getNote(note.id)).toBeUndefined();
  });

  it('repository delete a note with bad ID no error thrown', () => {
    expect(() => { repository.deleteNote('bad-id'); }).not.toThrowError();
  });

  it('list should have one note when 2015 is filter', () => {
    expect(repository.filteredNotes('2015').length).toEqual(1);
  });

  it('list should have three notes when 201 is filter', () => {
    expect(repository.filteredNotes('201').length).toEqual(3);
  });

  it('list should return all notes if filter empty', () => {
    expect(repository.filteredNotes().length).toEqual(4);
  });
});
