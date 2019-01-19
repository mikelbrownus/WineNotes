import React from 'react';
import { Link } from 'react-router-dom';
import { MdKeyboardBackspace } from 'react-icons/md';
import {
  Button, Card, CardContent, Typography, CardActions,
} from '@material-ui/core';
import NoteMapper from '../../model/note-mapper';

const divStyle = {
  height: 'calc(100% - 116px)',
  overflowY: 'scroll',
  margin: '0 auto',
  maxWidth: '650px',
};

const WineNoteView = ({ location }) => {
  const wineNote = (location && location.state) ? location.state.wineNote : {};
  const mapper = NoteMapper(wineNote);
  return (
    <div style={divStyle}>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {mapper.getName()}
          </Typography>
          <Typography component="p">
            {wineNote.tastingNote}
          </Typography>
          <Typography component="p">
            {wineNote.technicalNote}
          </Typography>
        </CardContent>
        <CardActions>
          <Link to="/">
            <Button variant="contained" color="primary">
              <MdKeyboardBackspace />
            </Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  );
};


export default WineNoteView;
