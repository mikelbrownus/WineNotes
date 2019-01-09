import React from 'react';

const divStyle = {
  height: 'calc(100% - 116px)',
  overflowY: 'scroll',
};

const WineNoteView = ({ location }) => {
  const { wineNote } = location.state;
  return (
    <div style={divStyle}>
      <p>{JSON.stringify(wineNote)}</p>
    </div>
  );
};


export default WineNoteView;
