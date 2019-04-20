import CollectionRepository from '../model/collection-repository';

let collectionRepo;

describe('CollectionRepository tests', () => {
  beforeEach(() => {
    collectionRepo = CollectionRepository();
  });

  it('Repository should be empty', () => {
    expect(collectionRepo.getCollections().length).toEqual(0);
  });
});
