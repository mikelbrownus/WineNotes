import uuidv1 from 'uuid/v1';
import clone from 'ramda/src/clone';

const CollectionRepository = () => {
  let collections = [];
  const addCollection = (collection) => {
    const newCollection = clone(collection);
    newCollection.id = uuidv1();
    newCollection.date = new Date();
    collections.push(newCollection);
    return newCollection;
  };
  return {
    addCollection,
    deleteCollection: (id) => { collections = collections.filter((item) => item.id !== id); },
    updateCollection: () => {},
    getCollections: () => collections,
  };
};

export default CollectionRepository;
