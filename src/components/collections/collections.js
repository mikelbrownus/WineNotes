import React, { useState, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import { MdAdd } from 'react-icons/md';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import CollectionDialog from './collection-dialog';
import CollectionCard from './collection-card';
import { CollectionContext } from '../providers/collection-provider';

const styles = theme => ({
  gridStyle: {
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
    position: 'position',
  },
});

const Collections = (props) => {
  const [open, setOpen] = useState(false);
  const { collections } = useContext(CollectionContext);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { classes } = props;

  return (
    <div className={classes.gridStyle}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        {collections.Collections.length > 0
          && collections.Collections.map(collection => (
            <Grid item xs={12} sm={6} md={4} key={collection.id}>
              <CollectionCard collection={collection} />
            </Grid>
          ))}
        {collections.Collections.length < 1 && (
          <Typography
            variant="h5"
            component="p"
            className={classes.noNoteMessage}
          >
            Press + to add a collection
          </Typography>
        )}
      </Grid>
      <Fab
        aria-label="Add"
        color="primary"
        size="small"
        className={classes.fab}
        onClick={handleOpen}
      >
        <MdAdd />
      </Fab>
      <CollectionDialog
        handleClose={handleClose}
        open={open}
      />
    </div>
  );
};

export default withStyles(styles)(Collections);
