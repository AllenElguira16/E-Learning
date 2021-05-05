import React, { FC, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import LessonLists from './components/LessonLists';
import PreviewLesson from './components/PreviewLesson';
import StudentLists from './components/StudentLists';
import SubjectLists from './components/SubjectLists';
import Navigation from './components/Navigation';

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

          <Route path="/admin/students" component={StudentLists} />

          <Route path="/admin/subjects/:subject_id/lessons/:lesson_id" component={PreviewLesson} />
          <Route path="/admin/subjects/:subject_id" component={LessonLists} />
          <Route path="/admin/subjects" component={SubjectLists} />

        </Switch>
      </Container>
    </>
  );
};

export default Admin;
