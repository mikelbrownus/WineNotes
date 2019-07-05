import React, { useEffect } from 'react';
import localForage from 'localforage';
import uuidv1 from 'uuid/v1';
import clone from 'ramda/src/clone';

const CollectionContext = React.createContext();

const initialState = {
  Collections: [],
  CurrentCollection: {},
};

const getItem = (id, collections) => {
  const one = collections.filter((item) => item.id === id);
  return clone(one[0]);
};

const addCollection = (collection) => {
  const newCollection = clone(collection);
  newCollection.id = uuidv1();
  newCollection.date = new Date();
  return newCollection;
};

const updateCollection = (payload, collections) => {
  const updatedCollection = Object.assign(getItem(payload.id, collections), payload);
  return collections.map(collection => (
    collection.id === updatedCollection.id ? updatedCollection : collection
  ));
};


const saveState = (collections) => {
  localForage.setItem('collections', JSON.stringify(collections.Collections));
};

const reducer = (state, action) => {
  let newState;
  switch (action.type) {
    case 'reset':
      return action.payload ? { ...state, Collections: action.payload } : initialState;
    case 'update-collection':
      newState = {
        ...state,
        Collections:
        updateCollection(action.payload, state.Collections),
      };
      saveState(newState);
      return newState;
    case 'update-currentCollection':
      newState = { ...state, CurrentCollection: action.payload };
      saveState(newState);
      return newState;
    case 'delete-collection':
      newState = {
        ...state,
        Collections: state.Collections.filter((c) => c.id !== action.payload),
      };
      saveState(newState);
      return newState;
    case 'add-collection':
      newState = { ...state, Collections: [...state.Collections, addCollection(action.payload)] };
      saveState(newState);
      return newState;
    default:
      return state;
  }
};

function CollectionContextProvider(props) {
  const [collections, dispatchCollection] = React.useReducer(reducer, initialState);
  const value = { collections, dispatchCollection };


  useEffect(
    () => {
      localForage.getItem('collections').then(saved => {
        if (saved) {
          const colls = JSON.parse(saved);
          dispatchCollection({ type: 'reset', payload: colls });
        }
      });
    },
    [],
  );
  const { children } = props;
  return (
    <CollectionContext.Provider value={value}>{children}</CollectionContext.Provider>
  );
}

const CollectionContextConsumer = CollectionContext.Consumer;

export { CollectionContext, CollectionContextProvider, CollectionContextConsumer };
