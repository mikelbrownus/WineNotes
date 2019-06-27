import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import { MdSettings } from 'react-icons/md';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { SettingsContext } from '../providers/settings-provider';


const styles = theme => ({
  divStyle: {
    height: 'calc(100% - 116px)',
    overflowY: 'auto',
  },
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(6))]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  formControl: {
    display: 'block',
    margin: theme.spacing(1),
    minWidth: 250,
  },
  submit: {
    marginTop: theme.spacing(3),
  },
});
const otherOrders = ['Vintage, Maker, Name, Varietal, Region',
  'Name, Maker, Varietal, Region, Vintage',
  'Maker, Region, Name, Varietal, Vintage'];

const Settings = (props) => {
  const { classes } = props;
  const { settings, dispatch } = React.useContext(SettingsContext);

  const updateWineMaker = (event) => {
    dispatch({ type: 'update-winemaker', payload: event.target.value });
  };

  const updateTasteNote = (event) => {
    dispatch({ type: 'update-tastingnotes', payload: event.target.value });
  };

  const updateTechNote = (event) => {
    dispatch({ type: 'update-technicalnotes', payload: event.target.value });
  };

  const updateAutoInsert = (event) => {
    dispatch({ type: 'update-auto-insert', payload: event.target.checked });
  };

  const updateNameOrder = (event) => {
    dispatch({ type: 'update-nameorder', payload: Number(event.target.value) });
  };


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
          <div className={classes.form}>
            <TextField
              autoFocus
              margin="dense"
              id="wineMaker"
              name="wineMaker"
              value={settings.wineMaker}
              label="Wine Maker"
              type="text"
              onChange={updateWineMaker}
              fullWidth
            />
            <TextField
              id="tastingNotes"
              name="tastingNotes"
              label="Wine Notes"
              value={settings.tastingNotes}
              multiline
              rowsMax="4"
              margin="normal"
              onChange={updateTasteNote}
              variant="outlined"
              fullWidth
            />

            <TextField
              id="technicalNotes"
              name="technicalNotes"
              label="Technical Notes"
              value={settings.technicalNotes}
              multiline
              rowsMax="4"
              margin="normal"
              variant="outlined"
              onChange={updateTechNote}
              fullWidth
            />
            <FormControlLabel
              control={(
                <Checkbox
                  name="autoInsertOn"
                  value="autoInsertOn"
                  color="primary"
                  checked={settings.autoInsertOn}
                  onChange={updateAutoInsert}
                />
              )}
              label="Use auto insert"
            />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="nameOrder">Order</InputLabel>
              <Select
                value={settings.nameOrder}
                onChange={updateNameOrder}
                fullWidth
                name="nameOrder"
                id="nameOrder"
              >
                <MenuItem value={0}>
                  <em>Default</em>
                </MenuItem>
                {otherOrders.map((order, i) => (
                  <MenuItem value={i + 1} key={order}>{order}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </Paper>
      </main>

    </div>
  );
};

export default withStyles(styles)(Settings);
