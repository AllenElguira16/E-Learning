import React, { FC } from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import Admin from './Admin';

const Pages: FC = () => {
  return (
    <>
      <Route path="/home"><Home/></Route>
      <Route path="/admin"><Admin/></Route>
    </>
  );
};

export default Pages;
