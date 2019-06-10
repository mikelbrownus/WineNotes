import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import { MdAdd } from 'react-icons/md';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import CollectionDialog from './collection-dialog';
import CollectionCard from './collection-card';
import Context from '../../app-context';

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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { classes } = props;

  return (
    <Context.Consumer>
      {context => (
        <div className={classes.gridStyle}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            {context.state.Collections.length > 0
              && context.state.Collections.map(collection => (
                <Grid item xs={12} sm={6} md={4} key={collection.id}>
                  <CollectionCard collection={collection} />
                </Grid>
              ))}
            {context.state.Collections.length < 1 && (
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
      )}
    </Context.Consumer>
  );
};

export default withStyles(styles)(Collections);
