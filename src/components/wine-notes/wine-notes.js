import React, { useState, useContext } from 'react';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { MdAdd } from 'react-icons/md';
import WineNoteCard from './wine-note-card';
import WineNoteDialog from './wine-note-dialog';
import { WineNoteContext } from '../providers/wine-note-provider';
import { SettingsContext } from '../providers/settings-provider';

const styles = theme => ({
  gridSize: {
    height: 'calc(100% - 132px)',
    margin: '8px 4px',
    [theme.breakpoints.up('sm')]: {
      margin: '8px 16px',
    },
    overflowY: 'auto',
  },
  fab: {
    position: 'absolute',
    bottom: '64px',
    right: '20px',
  },
  noNoteMessage: {
    margin: 'calc(15%) auto',
    display: 'block',
  },
});

const WineNotes = (props) => {
  const [open, setOpen] = useState(false);
  const { settings } = useContext(SettingsContext);
  const { wineNotes } = useContext(WineNoteContext);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { classes } = props;

  return (
    <div className={classes.gridSize}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        {wineNotes.WineNotes.filter(
          (item) => !item.collection,
        ).length > 0
          && wineNotes.WineNotes.filter(
            (item) => !item.collection,
          ).map(note => (
            <Grid item xs={12} sm={6} md={4} key={note.id}>
              <WineNoteCard note={note} order={settings.nameOrder} />
            </Grid>
          ))}
        {wineNotes.WineNotes.filter(
          (item) => !item.collection,
        ).length < 1
          && (
            <Typography
              variant="h5"
              component="p"
              className={classes.noNoteMessage}
            >
              Press + to add a note
            </Typography>
          )}
      </Grid>
      <Fab
        aria-label="Add"
        color="primary"
        size="small"
        onClick={handleOpen}
        className={classes.fab}
      >
        <MdAdd />
      </Fab>
      <WineNoteDialog
        handleClose={handleClose}
        open={open}
        settings={settings}
      />
    </div>
  );
};


export default withStyles(styles)(WineNotes);
