import React, { Fragment } from 'react';
import {
  Card, CardContent, Typography, CardMedia, withStyles,
} from '@material-ui/core';
import NoteMapper from '../../model/note-mapper';
import WineNoteDialog from './wine-note-dialog';
import Context from '../../app-context';

const styles = {
  body: {
    height: 'calc(100% - 136px)',
    overflowY: 'scroll',
    margin: '20px auto 0  auto',
    maxWidth: '650px',
  },
  media: {
    margin: 'auto 0 auto 0',
    maxWidth: '200px',
    height: '100%',
  },
  card: {
    display: 'flex',
    width: '100%',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',

  },
  content: {
    flex: '1 auto',
  },
};

class WineNoteView extends React.Component {
  constructor(props) {
    super(props);
    const { location } = props;
    this.state = (location && location.state) ? location.state.wineNote : {};
  }

  getMapper = () => NoteMapper(this.state)

  changeNote = (note) => {
    this.setState(note);
  }

  render() {
    const { tastingNote, technicalNote, image } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.body}>
        <Context.Consumer>
          { context => (
            <Fragment>
              <Card className={classes.card}>
                { image
                    && (
                      <CardMedia
                        className={classes.media}
                        image={image}
                        title={this.getMapper().getName()}
                        component="img"
                      />

                    )
                }
                <div className={classes.details}>
                  <CardContent className={classes.content}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {this.getMapper().getName()}
                    </Typography>
                    {tastingNote && (
                    <Fragment>
                      <Typography variant="h6" component="h3">
              Tasting Notes
                      </Typography>
                      <Typography component="p">
                        {tastingNote}
                      </Typography>
                    </Fragment>
                    )
            }
                    {technicalNote && (
                    <Fragment>
                      <Typography variant="h6" component="h3">
              Technical Notes
                      </Typography>
                      <Typography component="p">
                        {technicalNote}
                      </Typography>
                    </Fragment>
                    )
            }
                  </CardContent>
                </div>
              </Card>

              <WineNoteDialog
                handleClose={() => { context.state.setNoteDialog(false); }}
                open={context.state.editDialogOpen}
                wineNote={this.state}
                updateNote={this.changeNote}
              />
            </Fragment>
          )}
        </Context.Consumer>
      </div>
    );
  }
}


export default withStyles(styles)(WineNoteView);
