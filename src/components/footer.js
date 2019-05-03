import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Link from 'react-router-dom/Link';
import withRouter from 'react-router-dom/withRouter';
import withWidth from '@material-ui/core/withWidth';

const sections = ['Wine Notes', 'Collections', 'Settings', 'Help'];
class Footer extends React.Component {
  constructor(props) {
    super(props);
    const { location } = this.props;
    this.state = {
      index:
        location.pathname === '/' || !location.pathname
          ? 0
          : sections.findIndex(
            item => location.pathname.substring(1).toLowerCase().startsWith(item.toLowerCase())
                || (item === 'Wine Notes' && location.pathname.substring(1) === '/'),
          ),
    };
  }

  componentWillReceiveProps(newProps) {
    const { location } = newProps;
    const foundIndex = sections.findIndex(
      item => location.pathname.substring(1).toLowerCase().startsWith(item.toLowerCase())
      || (!location.pathname.substring(1).trim() && item === 'Wine Notes'),
    );
    const { index } = this.state;
    const shouldUpdate = index !== foundIndex && foundIndex !== -1;
    if (shouldUpdate) {
      this.setState({ index: foundIndex });
    }
  }

  shouldComponentUpdate(newProps) {
    const { location } = newProps;
    const foundIndex = sections.findIndex(
      item => location.pathname.substring(1).toLowerCase().startsWith(item.toLowerCase())
      || (!location.pathname.substring(1).trim() && item === 'Wine Notes'),
    );
    const { index } = this.state;
    return index !== foundIndex && foundIndex !== -1;
  }

  changeIndex = i => {
    this.setState({
      index: i,
    });
  };

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
              to={section === 'Wine Notes' ? '/' : `/${section.toLowerCase()}`}
            />
          ))}
        </Tabs>
      </Paper>
    );
  }
}
const it = withWidth()(Footer);
export default withRouter(it);
