import React from 'react';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { MdAdd } from 'react-icons/md';
import WineNoteCard from '../wine-notes/wine-note-card';
import WineNoteDialog from '../wine-notes/wine-note-dialog';
import Context from '../../app-context';

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
    position: 'position',
  },
});
class CollectionView extends React.Component {
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
              {context.state.WineNotes.length > 0
                && context.state.WineNotes.map(note => (
                  <Grid item xs={12} sm={6} md={4} key={note.id}>
                    <WineNoteCard note={note} order={context.state.settings.nameOrder} />
                  </Grid>
                ))}
              {context.state.WineNotes.length < 1 && (
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
              onClick={this.handleOpen}
              className={classes.fab}
            >
              <MdAdd />
            </Fab>
            <WineNoteDialog
              handleClose={this.handleClose}
              open={open}
              settings={context.state.settings}
            />
          </div>
        )}
      </Context.Consumer>
    );
  }
}

export default withStyles(styles)(CollectionView);
