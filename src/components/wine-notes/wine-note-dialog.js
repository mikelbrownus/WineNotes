import React from 'react';
import {
  TextField,
  MenuItem,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Select,
  DialogTitle,
} from '@material-ui/core';

const varietals = [
  'Cabernet Sauvignon', 'Pinot Noir', 'Merlot',
  'Syrah', 'Shiraz', 'Malbec', 'Zinfandel', 'Tempranillo',
  'Sangiovese', 'Nebbiolo', 'Cabernet Franc', 'Petit Verdot',
  'Petite Sirah', 'Mourvèdre', 'Chardonnay', 'Sauvignon Blanc',
  'Chenin Blanc', 'Riesling', 'Viognier', 'Gewürztraminer',
  'Pinot Grigio', 'Pinot Gris', 'Pinot Blanc', 'Moscato',
  'Sémillon', 'Grüner Veltliner', 'Müller-Thurgau',
].sort();
const WineNoteDialog = (props) => {
  const { open, handleClose } = props;
  return (
    <Dialog
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
          label="Wine Maker"
          type="text"
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Wine Name (or other designation)"
          type="text"
          fullWidth
        />
        <Select
          value="blend"
        >
          <MenuItem value="blend">Blend/Non varietal</MenuItem>
          {
            varietals.map(v => (
              <MenuItem value={v} key={v}>{v}</MenuItem>
            ))
        }
        </Select>
        <TextField
          autoFocus
          margin="dense"
          id="region"
          label="Region/terroir"
          type="text"
          fullWidth
        />

        <TextField
          id="outlined-multiline-flexible"
          label="Wine Notes"
          multiline
          rowsMax="4"
          margin="normal"
          variant="outlined"
        />

        <TextField
          id="outlined-multiline-flexible"
          label="Technical Notes"
          multiline
          rowsMax="4"
          margin="normal"
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
        Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
        Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WineNoteDialog;
