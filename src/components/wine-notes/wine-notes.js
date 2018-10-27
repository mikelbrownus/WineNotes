import React from 'react';
import { Grid, Paper } from '@material-ui/core';

const WineNotes = () => (
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
);

export default WineNotes;
