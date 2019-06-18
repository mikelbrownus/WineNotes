import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Link from 'react-router-dom/Link';
import withRouter from 'react-router-dom/withRouter';
import withWidth from '@material-ui/core/withWidth';

const sections = ['Wine Notes', 'Collections', 'Settings', 'Help'];

const Footer = (props) => {
  const { location } = props;
  const initialIndex = location.pathname === '/' || !location.pathname
    ? 0
    : sections.findIndex(
      item => location.pathname.substring(1).toLowerCase().startsWith(item.toLowerCase())
        || (item === 'Wine Notes' && location.pathname.substring(1) === '/'),
    );
  const [index, setIndex] = useState(initialIndex);


  useEffect(() => {
    const unlisten = props.history.listen((loc) => {
      const foundIndex = sections.findIndex(
        item => loc.pathname.substring(1).toLowerCase().startsWith(item.toLowerCase())
          || (!loc.pathname.substring(1).trim() && item === 'Wine Notes'),
      );
      const shouldUpdate = index !== foundIndex && foundIndex !== -1;
      if (shouldUpdate) {
        setIndex(foundIndex);
      }
    });
    return function cleanup() {
      unlisten();
    };
  });

  const changeIndex = i => {
    setIndex(i);
  };


  const { width } = props;
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
          changeIndex(i);
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
};

const it = withWidth()(Footer);
export default withRouter(it);
