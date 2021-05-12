import React, { FC, useCallback, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'reactstrap';

import LessonLists from './Admin/LessonLists';
import AdminNavigation from './Admin/components/AdminNavigation';
import HomeNavigation from './Home/components/HomeNavigation';
import PreviewLesson from './Admin/PreviewLesson';
import StudentLists from './Admin/StudentLists';
import SubjectLists from './Admin/SubjectLists';
import Login from './Home/Login';
import Main from './Home/Main';

import { getAuthenticatedStudent } from '~store/actions/AuthAction';
import { TDispatch } from '~store';
import StudentInfo from './Home/StudentInfo';


const Pages: FC = () => {

  const { auth } = useSelector<TRootReducers, TRootReducers>(state => state);

  const dispatch = useDispatch<TDispatch>();

  const fetchUser = useCallback(async () => {
    await dispatch(getAuthenticatedStudent());
  }, [dispatch]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <Switch>
      <Route path="/home" >
        <HomeNavigation />
        <Container>
          <Switch>
            {auth.status === 'verifying' && <>Loading...</>}
            {auth.status === 'not-authenticated' && (
              <>
                <Route exact path="/home/login" component={Login} />
                <Route exact path="/home" component={Main} />
              </>
            )}
            {auth.status === 'authenticated' && (
              <>
                <Redirect exact path="/home/login" to="/home" />

                <Route path="/home/student" component={StudentInfo} />
                <Route path="/home" >Hello, World!</Route>
              </>
            )}
          </Switch>
        </Container>
      </Route>
      <Route path="/admin">
        <AdminNavigation/>
        <Container>
          <Switch>
            <Redirect exact path="/admin" to="/admin/students?page=1" />

            {/* Students List */}
            <Route path="/admin/students" component={StudentLists} />

            {/* Admin Lesson Preview */}
            <Route path="/admin/subjects/:subject_id/lessons/:lesson_id" component={PreviewLesson} />

            {/* Lessons */}
            <Route path="/admin/subjects/:subject_id/lessons" component={LessonLists} />

            {/* Subject List */}
            <Route path="/admin/subjects" component={SubjectLists} />

          </Switch>
        </Container>
      </Route>
    </Switch>
  );
};

export default Pages;
