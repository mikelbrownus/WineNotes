import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Context from '../../app-context';


class CollectionDialog extends React.Component {
  constructor(props) {
    super(props);
    const { collection } = this.props;
    if (collection) {
      const {
        name,
        description,
        id,
      } = collection;
      this.state = {
        name,
        description,
        id,
      };
    } else {
      this.state = {
        name: '',
        description: '',
        id: '',
      };
    }
  }

  clearForm = () => {
    this.setState({
      name: '',
      description: '',
    });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      open, handleClose,
    } = this.props;
    const {
      name,
      description,
      id,
    } = this.state;
    return (
      <Context.Consumer>
        {context => (
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
                value={name}
                label="Collection Name"
                type="text"
                onChange={this.handleChange}
                fullWidth
                required
              />
              <TextField
                id="description"
                name="description"
                value={description}
                label="Description"
                multiline
                rowsMax="4"
                margin="normal"
                variant="outlined"
                onChange={this.handleChange}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  if (!id) {
                    this.clearForm();
                  }
                  handleClose();
                }}
                color="primary"
              >
                Cancel
              </Button>
              <Button
                onClick={
                  id
                    ? () => {
                      if (!name) {
                        context.state.updateCollection({ name: 'collection', description });
                      } else {
                        context.state.updateCollection(this.state);
                      }
                      this.clearForm();
                      handleClose();
                    }
                    : () => {
                      if (!name) {
                        context.state.addCollection({ name: 'collection', description });
                      } else {
                        context.state.addCollection(this.state);
                      }
                      this.clearForm();
                      handleClose();
                    }
                }
                color="primary"
              >
                {id ? 'Update' : 'Add'}
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Context.Consumer>
    );
  }
}

export default CollectionDialog;
