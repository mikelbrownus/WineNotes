import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  InputBase,
} from '@material-ui/core';
import {
  MdSearch, MdEdit, MdDeleteForever,
} from 'react-icons/md';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Context from '../app-context';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
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

const Header = (props) => {
  const { classes, location } = props;
  const hasSearch = (location.pathname === '/' || location.pathname === '/collections');
  const isView = (location.pathname === '/view');
  return (
    <Context.Consumer>
      { context => (
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.title}>
            Wine Notes
            </Typography>
            {hasSearch
          && (
          <Fragment>
            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <MdSearch />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            <Button
              color="inherit"
              onClick={context.state.addTestData}
            >
              Reset Test Data
            </Button>
          </Fragment>
          )
          }
            {isView
          && (
            <Fragment>
              <div className={classes.grow} />
              <IconButton color="inherit">
                <MdEdit />
              </IconButton>
              <IconButton color="inherit">
                <MdDeleteForever />
              </IconButton>
            </Fragment>

          )
          }
          </Toolbar>
        </AppBar>
      )}
    </Context.Consumer>
  );
};

const it = withStyles(styles)(Header);
export default withRouter(it);
