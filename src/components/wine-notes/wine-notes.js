import React from 'react';
import { Fab, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { MdAdd } from 'react-icons/md';
import WineNoteCard from './wine-note-card';
import WineNoteDialog from './wine-note-dialog';
import Context from '../../app-context';

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
    const { classes } = this.props;
    const { open } = this.state;
    return (
      <Context.Consumer>
        {context => (
          <div className={classes.gridSize}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              {context.state.WineNotes.map(note => (
                <Grid item xs={12} sm={6} md={4} key={note.id}>
                  <WineNoteCard note={note} />
                </Grid>
              ))}
            </Grid>
            <Fab
              aria-label="Add"
              color="primary"
              size="small"
              onClick={this.handleOpen}
              className={classes.fab}
            >
              <MdAdd />
            </Fab>
            <WineNoteDialog
              handleClose={this.handleClose}
              open={open}
            />
          </div>
        )}

      </Context.Consumer>
    );
  }
}

export default withStyles(styles)(WineNotes);
