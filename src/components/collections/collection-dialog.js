import React, { useState, useEffect, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CollectionContext } from '../providers/collection-provider';


const CollectionDialog = (props) => {
  const { collection, open, handleClose } = props;
  const theCollection = collection || { name: '', id: '', description: '' };
  const [coll, setCollection] = useState(theCollection);
  const { dispatchCollection } = useContext(CollectionContext);

  const updateCollection = (c) => {
    dispatchCollection({ type: 'update-currentCollection', payload: c });
    dispatchCollection({ type: 'update-collection', payload: c });
  };

  const addCollection = (c) => {
    dispatchCollection({ type: 'add-collection', payload: c });
  };

  const clearForm = () => {
    setCollection({
      name: '',
      description: '',
      id: '',
    });
  };

  const handleChange = event => {
    setCollection({ ...coll, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (collection) {
      setCollection(collection);
    }
  }, [collection]);

  return (

    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Collection</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          name="name"
          value={coll.name}
          label="Collection Name"
          type="text"
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          id="description"
          name="description"
          value={coll.description}
          label="Description"
          multiline
          rowsMax="4"
          margin="normal"
          variant="outlined"
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            if (!coll.id) {
              clearForm();
            }
            handleClose();
          }}
          color="primary"
        >
          Cancel
        </Button>
        <Button
          onClick={
            coll.id
              ? () => {
                if (!coll.name) {
                  updateCollection({ name: 'Collection', description: coll.description, id: coll.id });
                } else {
                  updateCollection(coll);
                }
                clearForm();
                handleClose();
              }
              : () => {
                if (!coll.name) {
                  addCollection({ name: 'Collection', description: coll.description });
                } else {
                  addCollection(coll);
                }
                clearForm();
                handleClose();
              }
          }
          color="primary"
        >
          {coll.id ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};


export default CollectionDialog;
