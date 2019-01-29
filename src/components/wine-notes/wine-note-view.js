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
  margin: '20px auto 0  auto',
  maxWidth: '650px',
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


  // const { open } = this.state;

  render() {
    const { tastingNote, technicalNote } = this.state;
    return (
      <div style={divStyle}>
        <Context.Consumer>
          { context => (
            <Fragment>
              <Card>
                <CardContent>
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


export default WineNoteView;
