import React, { FC, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import Navigation from './Navigation';
import Student from './Student';
import Lessons from './Lessons';

const Admin: FC = () => {

  useEffect(() => {
    document.title = 'E-Learning - Admin';
  }, []);
  
  return (
    <>
      <Navigation/>
      <Container>
        <Switch>
          <Redirect exact path="/admin" to="/admin/students?page=1" />

          <Route path="/admin/students"><Student/></Route>
          <Route path="/admin/lessons"><Lessons/></Route>
        </Switch>
      </Container>
    </>
  );
};

export default Admin;
