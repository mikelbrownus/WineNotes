import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { MdKeyboardBackspace } from 'react-icons/md';
import {
  Button, Card, CardContent, Typography, CardActions,
} from '@material-ui/core';
import NoteMapper from '../../model/note-mapper';
import WineNoteDialog from './wine-note-dialog';
import Context from '../../app-context';

const divStyle = {
  height: 'calc(100% - 116px)',
  overflowY: 'scroll',
  margin: '0 auto',
  maxWidth: '650px',
};

const WineNoteView = (props) => {
  const { location } = props;
  // const { open } = this.state;
  const wineNote = (location && location.state) ? location.state.wineNote : {};
  const mapper = NoteMapper(wineNote);
  return (
    <div style={divStyle}>
      <Context.Consumer>
        { context => (
          <Fragment>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {mapper.getName()}
                </Typography>
                {wineNote.tastingNote && (
                  <Fragment>
                    <Typography variant="h6" component="h3">
              Tasting Notes
                    </Typography>
                    <Typography component="p">
                      {wineNote.tastingNote}
                    </Typography>
                  </Fragment>
                )
            }
                {wineNote.technicalNote && (
                  <Fragment>
                    <Typography variant="h6" component="h3">
              Technical Notes
                    </Typography>
                    <Typography component="p">
                      {wineNote.technicalNote}
                    </Typography>
                  </Fragment>
                )
            }
              </CardContent>
              <CardActions>
                <Link to="/">
                  <Button variant="contained" color="primary">
                    <MdKeyboardBackspace />
                  </Button>
                </Link>
              </CardActions>
            </Card>
            <WineNoteDialog
              handleClose={() => { context.state.setNoteDialog(false); }}
              open={context.state.editDialogOpen}
              wineNote={wineNote}
            />
          </Fragment>
        )}
      </Context.Consumer>
    </div>
  );
};


export default WineNoteView;
