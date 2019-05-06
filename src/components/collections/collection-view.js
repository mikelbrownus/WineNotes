import React from 'react';
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
  },
  card: {
    margin: '10px auto',
    width: '300px',
    padding: '10px',
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
            {context.state.CurrentCollection.description && (
              <Card
                raised
                className={classes.card}
              >
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    align="center"
                  >
                    {context.state.CurrentCollection.description}
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
                  Press + to add note to collection
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
            <CollectionDialog
              handleClose={() => {
                context.state.editCollectionDialogToggle();
              }}
              open={context.state.editCollectionDialogOpen}
              collection={context.state.CurrentCollection}
            />
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
