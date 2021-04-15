import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import Navigation from './Navigation';
import Student from './Student';
import Lessons from './Lessons';

const Admin: FC = () => {
  return (
    <>
      <Navigation/>
      <Container>
        <Switch>
          <Route path="/admin/students"><Student/></Route>
          <Route path="/admin/lessons"><Lessons/></Route>
        </Switch>
      </Container>
    </>
  );
};

export default Admin;
