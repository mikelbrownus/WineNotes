import React from 'react';
import { Paper, Tabs, Tab } from '@material-ui/core';
import { Link } from 'react-router-dom';
import withWidth from '@material-ui/core/withWidth';

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
    const { width } = this.props;
    const isSmallScreen = /xs|sm/.test(width);
    const tabStyle = {
      fullWidth: isSmallScreen,
      centered: !isSmallScreen,
    };

    return (
      <Paper square>
        <Tabs
          value={index}
          onChange={(e, i) => {
            this.changeIndex(i);
          }}
          indicatorColor="primary"
          textColor="primary"
          {...tabStyle}
        >
          {sections.map(section => (
            <Tab
              label={section}
              key={section}
              component={Link}
              to={(section === 'Wine Notes') ? '/' : `/${section.toLowerCase()}`}
            />

          ))}
        </Tabs>
      </Paper>
    );
  }
}

export default withWidth()(Footer);
