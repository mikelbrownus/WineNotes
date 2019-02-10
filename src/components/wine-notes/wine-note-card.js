import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  withStyles,
} from '@material-ui/core';
import { TiWine } from 'react-icons/ti';
import NoteMapper from '../../model/note-mapper';

const isIEorFF = navigator.userAgent.indexOf('Firefox') !== -1 || navigator.userAgent.indexOf('MSIE') !== -1 || document.documentMode;
const nameLength = isIEorFF ? {
  overflow: 'hidden',
  lineHeight: '1em',
  maxHeight: '2em',
  textOverflow: 'ellipsis',
}
  : {
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': '3',
    '-webkit-box-orient': 'vertical',
  };

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'row',
    minWidth: 275,
    margin: '2px 0',
    height: 125,
  },
  externalImage: {
    objectFit: 'contain',
    padding: 4,
    width: '30%',
    marginLeft: '18px',
  },
  photo: {
    alignContent: 'center',
    padding: 4,
    height: '100%',
    width: '40px',
    marginLeft: '18px',
  },
  pos: {
    marginBottom: 12,
  },
  actionArea: {
    width: '100%',
  },
  nameLength,
};

function WineNoteCard(props) {
  const { classes, note } = props;
  const mapper = NoteMapper(note);

  return (
    <Card className={classes.card}>
      {
      note.image ? (
        <img
          src={note.image}
          alt={mapper.getName()}
          className={classes.externalImage}
        />
      )
        : (<TiWine className={classes.photo} />)
    }
      <CardActionArea
        className={classes.actionArea}
        onClick={() => props.history.push('/view', { wineNote: note })}
      >


        <CardContent>
          <Typography variant="subtitle1" component="p" className={classes.nameLength}>
            {mapper.getName()}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
          Date:
            {' '}
            {mapper.getDate()}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

const it = withStyles(styles)(WineNoteCard);
export default withRouter(it);
