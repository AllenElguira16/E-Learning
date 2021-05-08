import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Container } from 'reactstrap';
import LessonLists from './Admin/LessonLists';
import Navigation from './Admin/components/Navigation';
import PreviewLesson from './Admin/PreviewLesson';
import StudentLists from './Admin/StudentLists';
import SubjectLists from './Admin/SubjectLists';

const Pages: FC = () => {
  return (
    <Switch>
      <Route path="/home" >
        <div>Hello World</div>
      </Route>
      <Route path="/admin">
        <Navigation/>
        <Container>
          <Switch>
            <Redirect exact path="/admin" to="/admin/students?page=1" />

            <Route path="/admin/students" component={StudentLists} />

            <Route path="/admin/subjects/:subject_id/lessons/:lesson_id" component={PreviewLesson} />
            <Route path="/admin/subjects/:subject_id/lessons" component={LessonLists} />
            <Route path="/admin/subjects" component={SubjectLists} />

          </Switch>
        </Container>
      </Route>
    </Switch>
  );
};

export default Pages;
