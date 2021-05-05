import React, { FC } from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import Admin from './Admin';

const Pages: FC = () => {
  return (
    <>
      <Route path="/home" component={Home} />
      <Route path="/admin" component={Admin} />
    </>
  );
};

export default Pages;
