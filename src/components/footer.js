import React from 'react';
import { Paper, Tabs, Tab } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import withWidth from '@material-ui/core/withWidth';

const sections = ['Wine Notes', 'Collections', 'Settings', 'Help'];
class Footer extends React.Component {
  constructor(props) {
    super(props);
    const { location } = this.props;
    this.state = {
      index: location.pathname === '/' || !location.pathname ? 0 : sections.findIndex(item => location.pathname.substring(1).toLowerCase() === item.toLowerCase()),
    };
  }

  componentWillReceiveProps(newProps) {
    const { location } = newProps;
    const foundIndex = sections.findIndex(
      item => location.pathname.substring(1).toLowerCase() === item.toLowerCase(),
    );
    const { index } = this.state;
    const shouldUpdate = index !== foundIndex;
    if (shouldUpdate) {
      this.setState({ index: foundIndex });
    }
  }

  shouldComponentUpdate(newProps) {
    const { location } = newProps;
    const foundIndex = sections.findIndex(
      item => location.pathname.substring(1).toLowerCase() === item.toLowerCase(),
    );
    const { index } = this.state;
    return index !== foundIndex;
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
      variant: isSmallScreen ? 'fullWidth' : null,
      centered: !isSmallScreen,
    };

    return (
      <Paper square>
        <Tabs
          value={index < 0 ? 0 : index}
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
const it = withWidth()(Footer);
export default withRouter(it);
