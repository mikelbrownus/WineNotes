import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  TextField,
  MenuItem,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Select,
  DialogTitle,
  FormControl,
  InputLabel,
  FilledInput,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import Vintages from '../../model/vintages';
import VarietalsAutosuggest from './varietals-autosuggest';
import Context from '../../app-context';

const vintages = Vintages().getVintages();

const styles = {
  formControl: {
    margin: '8px 0',
  },
};

class WineNoteDialog extends React.Component {
  constructor(props) {
    super(props);
    const { wineNote } = this.props;
    this.wineNote = wineNote;
    if (wineNote) {
      const {
        varietal, vintage, nonvintage, maker, wineName, region, tastingNote, technicalNote,
      } = wineNote;
      this.state = {
        varietal,
        maker,
        vintage,
        nonvintage,
        wineName,
        region,
        tastingNote,
        technicalNote,
      };
    } else {
      this.state = {
        varietal: '',
        vintage: new Date().getFullYear().toString(),
        nonvintage: false,
        maker: '',
        region: '',
        wineName: '',
        tastingNote: '',
        technicalNote: '',
      };
    }
  }


  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  changeVarietalState = (value) => {
    this.setState({ varietal: value });
  }

  handleChangeCB = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  // handleSubmit = () => {
  //   const { handleClose } = this.props;
  //   handleClose();
  // };

  render() {
    const { open, handleClose, classes } = this.props;
    const id = this.wineNote && this.wineNote.id ? this.wineNote.id : '0';
    const {
      vintage,
      varietal,
      nonvintage,
      maker,
      region,
      wineName,
      tastingNote,
      technicalNote,
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
            <DialogTitle id="form-dialog-title">Wine Note</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="maker"
                name="maker"
                value={maker}
                label="Wine Maker"
                type="text"
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                margin="dense"
                id="name"
                name="wineName"
                value={wineName}
                label="Wine Name (or other designation)"
                type="text"
                onChange={this.handleChange}
                fullWidth
              />
              <VarietalsAutosuggest
                varietal={varietal}
                changeParentState={this.changeVarietalState}
              />
              <FormControl variant="filled" className={classes.formControl} disabled={nonvintage} fullWidth>
                <InputLabel htmlFor="vintage">Vintage</InputLabel>
                <Select
                  value={vintage}
                  onChange={this.handleChange}
                  input={<FilledInput name="vintage" id="vintage" />}
                >
                  {
                vintages.map(v => (
                  <MenuItem value={v} key={v}>{v}</MenuItem>
                ))
            }
                </Select>
              </FormControl>
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={nonvintage}
                    onChange={this.handleChangeCB}
                    name="nonvintage"
                    value="nonvintage"
                  />
)}
                label="Non Vintage Wine"
              />
              <TextField
                margin="dense"
                id="region"
                name="region"
                value={region}
                label="Region/terroir"
                type="text"
                onChange={this.handleChange}
                fullWidth
              />

              <TextField
                id="tastingNote"
                name="tastingNote"
                label="Wine Notes"
                value={tastingNote}
                multiline
                rowsMax="4"
                margin="normal"
                onChange={this.handleChange}
                variant="outlined"
                fullWidth
              />

              <TextField
                id="technicalNote"
                name="technicalNote"
                label="Technical Notes"
                value={technicalNote}
                multiline
                rowsMax="4"
                margin="normal"
                variant="outlined"
                onChange={this.handleChange}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
          Cancel
              </Button>
              <Button
                onClick={this.wineNote
                  ? () => { context.state.updateNote(id, this.state); handleClose(); }
                  : () => { context.state.addNote(this.state); handleClose(); }}
                color="primary"
              >
                {this.wineNote ? 'Update' : 'Add'}
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Context.Consumer>
    );
  }
}


export default withStyles(styles)(WineNoteDialog);
