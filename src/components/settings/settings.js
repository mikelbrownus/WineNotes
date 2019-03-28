import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { MdSettings } from 'react-icons/md';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';


const styles = theme => ({
  divStyle: {
    height: 'calc(100% - 116px)',
    overflowY: 'auto',
  },
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  formControl: {
    display: 'block',
    margin: theme.spacing.unit,
    minWidth: 250,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

const Settings = (props) => {
  const { classes } = props;
  return (
    <div className={classes.divStyle}>
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <MdSettings />
          </Avatar>
          <Typography component="h1" variant="h5">
            Settings
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="maker">Wine Maker</InputLabel>
              <Input type="text" id="maker" name="maker" autoFocus />
            </FormControl>
            <TextField
              id="tastingNote"
              name="tastingNote"
              label="Wine Notes"
              value=""
              multiline
              rowsMax="4"
              margin="normal"
                // onChange={this.handleChange}
              variant="outlined"
              fullWidth
            />

            <TextField
              id="technicalNote"
              name="technicalNote"
              label="Technical Notes"
              value=""
              multiline
              rowsMax="4"
              margin="normal"
              variant="outlined"
                // onChange={this.handleChange}
              fullWidth
            />
            <FormControlLabel
              control={<Checkbox value="auto-insert" color="primary" />}
              label="Use auto insert"
            />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-controlled-open-select">Order</InputLabel>
              <Select
            // open={this.state.open}
            // onClose={this.handleClose}
            // onOpen={this.handleOpen}
                value="Default"
            // onChange={this.handleChange}
                fullWidth
                inputProps={{
                  name: 'order',
                  id: 'order',
                }}
              >
                <MenuItem value="">
                  <em>Default</em>
                </MenuItem>
                <MenuItem value={1}>Region/Maker/Name/Varietal/Vintage</MenuItem>
                <MenuItem value={2}>Vintage/Maker/Name/Varietal/Region</MenuItem>
                <MenuItem value={3}>Maker/Name/Region/Varietal/Vintage</MenuItem>
              </Select>
            </FormControl>
          </form>
        </Paper>
      </main>
    </div>
  );
};

export default withStyles(styles)(Settings);
