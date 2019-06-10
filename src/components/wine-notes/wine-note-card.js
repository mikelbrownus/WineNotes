import React from 'react';
import withRouter from 'react-router-dom/withRouter';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { TiWine } from 'react-icons/ti';
import NoteMapper from '../../model/note-mapper';

const isIEorFF = navigator.userAgent.indexOf('Firefox') !== -1
  || navigator.userAgent.indexOf('MSIE') !== -1
  || document.documentMode;
const nameLength = isIEorFF
  ? {
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
  date: {
    padding: '2px 0px',
  },
  rating: {
    border: '1px #E0A838 solid',
    marginBottom: '12px',
    marginRight: '12px',
    padding: '2px 4px',
  },
  actionArea: {
    width: '100%',
  },
  secondLine: {
    display: 'flex',
    alignItems: 'left',
  },
  nameLength,
};

const WineNoteCard = (props) => {
  const { classes, note, order } = props;
  const mapper = NoteMapper(note);

  return (
    <Card className={classes.card}>
      {note.image ? (
        <img
          src={note.image}
          alt={mapper.getName(order)}
          className={classes.externalImage}
        />
      ) : (
        <TiWine className={classes.photo} />
      )}
      <CardActionArea
        className={classes.actionArea}
        onClick={() => {
          props.history.push('/view', { wineNote: note, order });
        }}
      >
        <CardContent>
          <Typography
            variant="subtitle1"
            component="p"
            className={classes.nameLength}
          >
            {mapper.getName(order)}
          </Typography>
          <div className={classes.secondLine}>
            {(note.rating) ? (
              <Typography
                className={classes.rating}
                color="textSecondary"
                variant="subtitle2"
                component="span"
              >
                {note.rating}
              </Typography>
            ) : ''}
            <Typography
              className={classes.date}
              color="textSecondary"
              variant="subtitle2"
              component="span"
            >
            Date:
              {' '}
              {mapper.getDate()}
            </Typography>

          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const it = withStyles(styles)(WineNoteCard);
export default withRouter(it);
