import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { MdAdd } from 'react-icons/md';
import WineNoteCard from './wine-note-card';
import WineNoteDialog from './wine-note-dialog';

const styles = theme => ({
  gridSize: {
    height: 'calc(100% - 132px)',
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
class WineNotes extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, notes } = this.props;
    const { open } = this.state;
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
          onClick={this.handleOpen}
          className={classes.fab}
        >
          <MdAdd />
        </Button>
        <WineNoteDialog
          handleClose={this.handleClose}
          open={open}
        />
      </div>
    );
  }
}

export default withStyles(styles)(WineNotes);
