import React, { Fragment } from 'react';
import withRouter from 'react-router-dom/withRouter';
import Link from 'react-router-dom/Link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import {
  MdSearch,
  MdEdit,
  MdDeleteForever,
  MdKeyboardBackspace,
  MdHome,
} from 'react-icons/md';
import withStyles from '@material-ui/core/styles/withStyles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Context from '../app-context';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  home: {
    width: '80px',
    color: 'white',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    'font-size': '.90rem',
    [theme.breakpoints.up('sm')]: {
      'font-size': '1.5rem',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '60%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

class Header extends React.Component {
  state = {
    filter: '',
    alert: false,
  };

  changeFilter = filter => {
    this.setState({ filter });
  };

  toggleAlert = on => {
    this.setState({ alert: on });
  };

  render() {
    const { classes, location, history } = this.props;
    const { filter, alert } = this.state;
    const hasSearch = location.pathname === '/';
    const isView = location.pathname === '/view';
    const wineNote = location && location.state ? location.state.wineNote : {};
    return (
      <Context.Consumer>
        {context => (
          <AppBar position="static">
            <Dialog
              open={alert}
              onClose={this.handleClose}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                Delete wine note?
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  No going back after this. Shall I delete?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    this.toggleAlert(false);
                    context.state.deleteNote(wineNote.id);
                    history.push('/');
                  }}
                  color="primary"
                >
                  Delete
                </Button>
                <Button
                  onClick={() => {
                    this.toggleAlert(false);
                  }}
                  color="primary"
                  autoFocus
                >
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
            <Toolbar>
              {isView ? (
                <Link to="/">
                  <Button
                    variant="contained"
                    color="primary"
                    aria-label="back"
                    className={classes.home}
                  >
                    <MdKeyboardBackspace fontSize="x-large" />
                  </Button>
                </Link>
              ) : (
                <Link to="/help">
                  <IconButton
                    variant="contained"
                    aria-label="home"
                    className={classes.home}
                  >
                    <MdHome />
                  </IconButton>
                </Link>
              )}

              <Typography
                variant="h6"
                color="inherit"
                className={classes.title}
              >
                Wine Notes
              </Typography>
              {hasSearch && (
                <Fragment>
                  <div className={classes.grow} />
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <MdSearch />
                    </div>
                    <InputBase
                      placeholder="Search…"
                      value={filter}
                      onChange={event => {
                        this.changeFilter(event.target.value);
                        context.state.filterNotes(event.target.value);
                      }}
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                    />
                  </div>
                  <Button color="inherit" onClick={context.state.addTestData}>
                    Reset Test Data
                  </Button>
                </Fragment>
              )}
              {isView && (
                <Fragment>
                  <div className={classes.grow} />
                  <IconButton
                    color="inherit"
                    onClick={() => {
                      context.state.editNoteDialogToggle();
                    }}
                  >
                    <MdEdit />
                  </IconButton>
                  <IconButton
                    color="inherit"
                    onClick={() => {
                      this.toggleAlert(true);
                    }}
                  >
                    <MdDeleteForever />
                  </IconButton>
                </Fragment>
              )}
            </Toolbar>
          </AppBar>
        )}
      </Context.Consumer>
    );
  }
}

const it = withStyles(styles)(Header);
export default withRouter(it);
