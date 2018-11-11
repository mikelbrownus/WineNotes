import React from 'react';
import { Button, Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';

const styles = theme => ({
  gridSize: {
    height: 'calc(100% - 108px)',
  },
  fab: {
    position: 'absolute',
    bottom: '64px',
    right: '20px',

  },
}
);
const WineNotes = (props) => {
  const { classes } = props;
  return (
    <div className={classes.gridSize}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={6} md={4}>
          <Paper>One</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper>Two</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper>Three</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper>Four</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper>Five</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper>Six</Paper>
        </Grid>
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
