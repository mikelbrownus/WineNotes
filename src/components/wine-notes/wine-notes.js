import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';
import WineNoteCard from './wine-note-card';

const styles = theme => ({
  gridSize: {
    height: 'calc(100% - 116px)',
    margin: '8px 4px',
    [theme.breakpoints.up('sm')]: {
      margin: '8px 16px',
    },
    overflowY: 'scroll',
  },
  fab: {
    position: 'absolute',
    bottom: '64px',
    right: '20px',

  },
}
);
const WineNotes = (props) => {
  const { classes, notes } = props;
  return (
    <div className={classes.gridSize}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        {notes.map(note => (
          <Grid item xs={12} sm={6} md={4} key={note.id}>
            <WineNoteCard note={note} />
          </Grid>
        ))}
      </Grid>
      <Button
        variant="fab"
        mini
        color="primary"
        className={classes.fab}
      >
        <Add />
      </Button>
    </div>
  );
};

export default withStyles(styles)(WineNotes);
