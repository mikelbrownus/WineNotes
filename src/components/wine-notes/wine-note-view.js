import React from 'react';
import { Link } from 'react-router-dom';
import { MdKeyboardBackspace } from 'react-icons/md';
import { Button } from '@material-ui/core';

const divStyle = {
  height: 'calc(100% - 116px)',
  overflowY: 'scroll',
  margin: '0 auto',
  maxWidth: '650px',
};

const WineNoteView = ({ location }) => {
  const { wineNote } = location.state;
  return (
    <div style={divStyle}>
      <p>{JSON.stringify(wineNote)}</p>
      <Link to="/">
        <Button variant="contained" color="primary">
          <MdKeyboardBackspace />
        </Button>
      </Link>
    </div>
  );
};


export default WineNoteView;
