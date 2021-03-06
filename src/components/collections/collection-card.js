import React from 'react';
import withRouter from 'react-router-dom/withRouter';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { CollectionContext } from '../providers/collection-provider';

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
  pos: {
    marginBottom: 12,
  },
  actionArea: {
    width: '100%',
  },
  nameLength,
};

const CollectionCard = (props) => {
  const { classes, collection } = props;
  const { dispatchCollection } = React.useContext(CollectionContext);

  const setCurrentCollection = (c) => {
    dispatchCollection({ type: 'update-currentCollection', payload: c });
  };

  return (
    <Card className={classes.card}>
      <CardActionArea
        className={classes.actionArea}
        onClick={() => {
          setCurrentCollection(collection);
          props.history.push('/collectionsView');
        }}
      >
        <CardContent>
          <Typography
            variant="subtitle1"
            component="p"
            className={classes.nameLength}
          >
            {collection.name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Date:
            {' '}
            {new Date(collection.date).toLocaleDateString()}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const it = withStyles(styles)(CollectionCard);
export default withRouter(it);
