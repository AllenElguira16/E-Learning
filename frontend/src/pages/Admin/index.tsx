import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import Navigation from './Navigation';
import Student from './Student';

const Admin: FC = () => {
  return (
    <>
      <Navigation/>
      <Container>
        <Switch>
          <Redirect exact path="/admin/student" to="/admin/student/1" />

          <Route path="/admin/student/:page" component={Student} />
          {/* <Route path="/admin/student/add" component={AddStudent} /> */}
        </Switch>
      </Container>
    </>
  );
};

export default Admin;
