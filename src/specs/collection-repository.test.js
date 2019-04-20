import CollectionRepository from '../model/collection-repository';

let collectionRepo;
const uuidPattern = /^[0-9A-F]{8}-[0-9A-F]{4}-[1][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

describe('CollectionRepository tests', () => {
  beforeEach(() => {
    collectionRepo = CollectionRepository();
  });

  it('Repository should be empty', () => {
    expect(collectionRepo.getCollections().length).toEqual(0);
  });

  it('Repository should have one item', () => {
    collectionRepo.addCollection({ name: 'name', description: 'description' });
    expect(collectionRepo.getCollections().length).toEqual(1);
  });

  it('Added item should have id ', () => {
    collectionRepo.addCollection({ name: 'name', description: 'description' });
    expect(collectionRepo.getCollections()[0].id).toMatch(uuidPattern);
  });

  it('Added item should not be referentially equal but copies', () => {
    const newCollection = { name: 'name', description: 'description' };
    collectionRepo.addCollection(newCollection);
    newCollection.id = collectionRepo.getCollections()[0].id;
    newCollection.date = collectionRepo.getCollections()[0].date;
    expect(collectionRepo.getCollections()[0]).not.toBe(newCollection);
    expect(collectionRepo.getCollections()[0]).toEqual(newCollection);
  });

  it('Added item should have date', () => {
    collectionRepo.addCollection({ name: 'name', description: 'description' });
    expect(collectionRepo.getCollections()[0].date).not.toBeUndefined();
  });
});
