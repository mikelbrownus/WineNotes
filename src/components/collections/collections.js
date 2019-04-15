import React from 'react';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import { MdAdd } from 'react-icons/md';
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
});

class Collections extends React.Component {
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
            </Grid>
            <Fab
              aria-label="Add"
              color="primary"
              size="small"
              className={classes.fab}
              onClick={this.handleOpen}
            >
              <MdAdd />
            </Fab>
            <CollectionDialog
              handleClose={this.handleClose}
              open={open}
            />
          </div>
        )}
      </Context.Consumer>
    );
  }
}

export default withStyles(styles)(Collections);
