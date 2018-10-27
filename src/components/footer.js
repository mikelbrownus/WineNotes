import React from 'react';
import { Paper, Tabs, Tab } from '@material-ui/core';

const sections = ['Wine Notes', 'Collections', 'Settings', 'Help'];
class Footer extends React.Component {
  state = {
    index: 0,
  }

  changeIndex = (i) => {
    this.setState({
      index: i,
    });
  }

  render() {
    const { index } = this.state;
    return (
      <Paper square>
        <Tabs
          value={index}
          onChange={(e, i) => {
            this.changeIndex(i);
          }}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          {sections.map(section => (
            <Tab label={section} key={section} />
          ))}
        </Tabs>
      </Paper>
    );
  }
}

export default Footer;
