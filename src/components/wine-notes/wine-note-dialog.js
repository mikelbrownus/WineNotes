import React, { useState, useEffect, useContext } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Slider from '@material-ui/core/Slider';
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
import { WineNoteContext } from '../providers/wine-note-provider';
import { CollectionContext } from '../providers/collection-provider';

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

const WineNoteDialog = (props) => {
  const {
    wineNote, settings, open, handleClose, classes, updateNote,
  } = props;
  const theWineNote = wineNote || {
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
  const [wn, setWineNote] = useState(theWineNote);
  const { dispatchWineNotes } = useContext(WineNoteContext);
  const { collections } = useContext(CollectionContext);

  useEffect(() => {
    if (wineNote) {
      setWineNote(wineNote);
    }
  }, [wineNote, settings]);


  const clearForm = () => {
    setWineNote({
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

  const handleChange = event => {
    setWineNote({ ...wn, [event.target.name]: event.target.value });
  };

  const changeVarietalState = value => {
    setWineNote({ ...wn, varietal: value });
  };

  const handleChangeCB = event => {
    setWineNote({ ...wn, [event.target.name]: event.target.checked });
  };

  const handleRatingChange = (event, value) => {
    setWineNote({ ...wn, rating: value });
  };
  const id = wineNote && wineNote.id ? wineNote.id : '0';
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
  } = wn;

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
          value={maker || ''}
          label="Wine Maker"
          type="text"
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          id="name"
          name="wineName"
          value={wineName || ''}
          label="Wine Name (or other designation)"
          type="text"
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          id="image"
          name="image"
          value={image || ''}
          label="URL to image"
          type="text"
          onChange={handleChange}
          fullWidth
        />
        <VarietalsAutosuggest
          varietal={varietal || ''}
          changeParentState={changeVarietalState}
        />
        <FormControl
          variant="filled"
          className={classes.formControl}
          disabled={nonvintage}
          fullWidth
        >
          <InputLabel htmlFor="vintage">Vintage</InputLabel>
          <Select
            value={vintage || ''}
            onChange={handleChange}
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
              onChange={handleChangeCB}
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
          value={region || ''}
          label="Region/terroir"
          type="text"
          onChange={handleChange}
          fullWidth
        />

        <TextField
          id="tastingNote"
          name="tastingNote"
          label="Wine Notes"
          value={tastingNote || ''}
          multiline
          rowsMax="4"
          margin="normal"
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />

        <TextField
          id="technicalNote"
          name="technicalNote"
          label="Technical Notes"
          value={technicalNote || ''}
          multiline
          rowsMax="4"
          margin="normal"
          variant="outlined"
          onChange={handleChange}
          fullWidth
        />
        <Typography id="label">
          Rating:
          {' '}
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
          onChange={handleRatingChange}
        />
        {wineNote && (
          <FormControl
            variant="filled"
            className={classes.formControl}
            fullWidth
          >
            <InputLabel htmlFor="collection">Collection</InputLabel>
            <Select
              value={collection || ''}
              onChange={handleChange}
              input={<FilledInput name="collection" />}
              displayEmpty
              className={classes.selectEmpty}
            >
              <MenuItem value="">
                None
              </MenuItem>
              {collections.Collections.map(v => (
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
        <Button
          onClick={() => {
            if (!wn.id) {
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
            wineNote
              ? () => {
                dispatchWineNotes({ type: 'update-notes', payload: { id, changes: wn } });
                updateNote(wn);
                handleClose();
              }
              : () => {
                dispatchWineNotes({ type: 'add-note', payload: { ...wn, collection: collections.CurrentCollection.id } });
                clearForm();
                handleClose();
              }
          }
          color="primary"
        >
          {wineNote ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};


export default withStyles(styles)(WineNoteDialog);
