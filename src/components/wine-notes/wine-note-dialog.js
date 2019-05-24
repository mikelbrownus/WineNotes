import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Slider from '@material-ui/lab/Slider';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FilledInput from '@material-ui/core/FilledInput';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Vintages from '../../model/vintages';
import VarietalsAutosuggest from './varietals-autosuggest';
import Context from '../../app-context';

const vintages = Vintages().getVintages();

const styles = theme => ({
  formControl: {
    margin: '8px 0',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  slider: {
    padding: '22px 10px',
  },
});

class WineNoteDialog extends React.Component {
  constructor(props) {
    super(props);
    const { wineNote, settings } = this.props;
    this.wineNote = wineNote;
    if (wineNote) {
      const {
        varietal,
        vintage,
        nonvintage,
        maker,
        wineName,
        image,
        region,
        tastingNote,
        technicalNote,
        collection,
        rating,
      } = wineNote;
      this.state = {
        varietal,
        maker,
        vintage,
        nonvintage,
        wineName,
        image,
        region,
        tastingNote,
        technicalNote,
        collection,
        rating,
      };
    } else {
      this.state = {
        varietal: '',
        vintage: new Date().getFullYear().toString(),
        nonvintage: false,
        maker: (settings.autoInsertOn) ? settings.wineMaker : '',
        image: '',
        region: '',
        wineName: '',
        tastingNote: (settings.autoInsertOn) ? settings.tastingNotes : '',
        technicalNote: (settings.autoInsertOn) ? settings.technicalNotes : '',
        collection: '',
        rating: 0,
      };
    }
  }

  clearForm = () => {
    this.setState({
      varietal: '',
      vintage: new Date().getFullYear().toString(),
      nonvintage: false,
      maker: '',
      image: '',
      region: '',
      wineName: '',
      tastingNote: '',
      technicalNote: '',
      collection: '',
      rating: 0,
    });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  changeVarietalState = value => {
    this.setState({ varietal: value });
  };

  handleChangeCB = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  handleRatingChange = (event, value) => {
    this.setState({ rating: value });
  };

  render() {
    const {
      open, handleClose, classes, updateNote,
    } = this.props;
    const id = this.wineNote && this.wineNote.id ? this.wineNote.id : '0';
    const {
      vintage,
      varietal,
      nonvintage,
      maker,
      image,
      region,
      wineName,
      tastingNote,
      technicalNote,
      collection = '',
      rating = 0,
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
              <TextField
                margin="dense"
                id="image"
                name="image"
                value={image}
                label="URL to image"
                type="text"
                onChange={this.handleChange}
                fullWidth
              />
              <VarietalsAutosuggest
                varietal={varietal}
                changeParentState={this.changeVarietalState}
              />
              <FormControl
                variant="filled"
                className={classes.formControl}
                disabled={nonvintage}
                fullWidth
              >
                <InputLabel htmlFor="vintage">Vintage</InputLabel>
                <Select
                  value={vintage}
                  onChange={this.handleChange}
                  input={<FilledInput name="vintage" id="vintage" />}
                >
                  {vintages.map(v => (
                    <MenuItem value={v} key={v}>
                      {v}
                    </MenuItem>
                  ))}
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
              <Typography id="label">
Rating:
                {rating}
              </Typography>
              <Slider
                id="rating"
                name="rating"
                className={classes.slider}
                value={rating}
                min={0}
                max={100}
                step={1}
                aria-labelledby="label"
                onChange={this.handleRatingChange}
              />
              {this.wineNote && (
              <FormControl
                variant="filled"
                className={classes.formControl}
                fullWidth
              >
                <InputLabel htmlFor="collection">Collection</InputLabel>
                <Select
                  value={collection}
                  onChange={this.handleChange}
                  input={<FilledInput name="collection" />}
                  displayEmpty
                  className={classes.selectEmpty}
                >
                  <MenuItem value="">
                      None
                  </MenuItem>
                  {context.state.Collections.map(v => (
                    <MenuItem value={v.id} key={v.id}>
                      {v.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              )
              }
            </DialogContent>
            <DialogActions>
              <Button onClick={() => { this.clearForm(); handleClose(); }} color="primary">
                Cancel
              </Button>
              <Button
                onClick={
                  this.wineNote
                    ? () => {
                      context.state.updateNote(id, this.state);
                      updateNote(this.state);
                      handleClose();
                    }
                    : () => {
                      context.state.addNote(
                        { ...this.state, collection: context.state.CurrentCollection.id },
                      );
                      this.clearForm();
                      handleClose();
                    }
                }
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
