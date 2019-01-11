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
import Varietals from '../../model/varietals';
import Vintages from '../../model/vintages';
import IntegrationAutosuggest from '../widgets/integration-autosuggest';

const varietals = Varietals().getVarietals();
const vintages = Vintages().getVintages();

const styles = {
  formControl: {
    margin: '8px 0',
  },
};

class WineNoteDialog extends React.Component {
  state = {
    varietal: 'Blend',
    vintage: new Date().getFullYear().toString(),
    nonvintage: false,
    maker: '',
    region: '',
    wineName: '',
    tastingNote: '',
    technicalNote: '',
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeCB = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  handleSubmit = () => {
    const { handleClose } = this.props;
    handleClose();
  };

  render() {
    const { open, handleClose, classes } = this.props;
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
          <IntegrationAutosuggest />

          <FormControl variant="filled" className={classes.formControl} fullWidth>
            <InputLabel htmlFor="varietal">Varietal</InputLabel>
            <Select
              value={varietal}
              onChange={this.handleChange}
              input={<FilledInput name="varietal" id="varietal" />}
            >
              <MenuItem value="Blend">Blend/Non varietal</MenuItem>
              {
                varietals.map(v => (
                  <MenuItem value={v} key={v}>{v}</MenuItem>
                ))
            }
            </Select>
          </FormControl>
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
            onClick={this.handleSubmit}
            color="primary"
          >
          Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}


export default withStyles(styles)(WineNoteDialog);
