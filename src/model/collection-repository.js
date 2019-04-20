import uuidv1 from 'uuid/v1';
import clone from 'ramda/src/clone';

const CollectionRepository = () => {
  const collections = [];
  const addCollection = (collection) => {
    const newCollection = clone(collection);
    newCollection.id = uuidv1();
    newCollection.date = new Date();
    collections.push(newCollection);
  };
  return {
    addCollection,
    deleteCollection: () => {},
    updateCollection: () => {},
    getCollections: () => collections,
  };
};

export default CollectionRepository;
