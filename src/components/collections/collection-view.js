import React, { useState, useContext } from 'react';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { MdAdd } from 'react-icons/md';
import WineNoteCard from '../wine-notes/wine-note-card';
import WineNoteDialog from '../wine-notes/wine-note-dialog';
import CollectionDialog from './collection-dialog';
import { WineNoteContext } from '../providers/wine-note-provider';
import { SettingsContext } from '../providers/settings-provider';
import { CollectionContext } from '../providers/collection-provider';

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
  card: {
    margin: '10px auto',
    width: '300px',
    padding: '10px',
  },
});
const CollectionView = (props) => {
  const [open, setOpen] = useState(false);
  const { settings } = useContext(SettingsContext);
  const { collections } = useContext(CollectionContext);
  const { wineNotes, dispatchWineNotes } = useContext(WineNoteContext);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { classes } = props;

  return (
    <div className={classes.gridSize}>
      {collections.CurrentCollection.description && (
        <Card
          raised
          className={classes.card}
        >
          <CardContent>
            <Typography
              variant="subtitle1"
              align="center"
            >
              {collections.CurrentCollection.description}
            </Typography>
          </CardContent>
        </Card>
      )}
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        {wineNotes.WineNotes.filter(
          (item) => item.collection === collections.CurrentCollection.id,
        ).length > 0
          && wineNotes.WineNotes.filter(
            (item) => item.collection === collections.CurrentCollection.id,
          )
            .map(note => (
              <Grid item xs={12} sm={6} md={4} key={note.id}>
                <WineNoteCard note={note} order={settings.nameOrder} />
              </Grid>
            ))}
        {wineNotes.WineNotes.filter(
          (item) => item.collection === collections.CurrentCollection.id,
        ).length < 1 && (
        <Typography
          variant="h5"
          component="p"
          className={classes.noNoteMessage}
        >
              Press + to add note to collection
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
      <CollectionDialog
        handleClose={() => {
          dispatchWineNotes({ type: 'collection-dialog-toggle', payload: false });
        }}
        open={wineNotes.editCollectionDialogOpen}
        collection={collections.CurrentCollection}
      />
      <WineNoteDialog
        handleClose={handleClose}
        open={open}
        settings={settings}
      />
    </div>
  );
};

export default withStyles(styles)(CollectionView);
