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

  const getItem = (id) => {
    const one = collections.filter((item) => item.id === id);
    return clone(one[0]);
  };

  const update = (id, newProperties) => {
    const updatedCollection = Object.assign(getItem(id), newProperties);
    collections = collections.map(collection => (
      collection.id === updatedCollection.id ? updatedCollection : collection
    ));
  };

  return {
    addCollection,
    deleteCollection: (id) => { collections = collections.filter((item) => item.id !== id); },
    updateCollection: update,
    getCollections: () => collections,
    get: getItem,
    setCollections: (loadedCollections) => { collections = loadedCollections; },
  };
};

export default CollectionRepository;
