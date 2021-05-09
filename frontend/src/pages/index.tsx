import React, { FC, useCallback, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import LessonLists from './Admin/LessonLists';
import AdminNavigation from './Admin/components/Navigation';
import PreviewLesson from './Admin/PreviewLesson';
import StudentLists from './Admin/StudentLists';
import SubjectLists from './Admin/SubjectLists';

import Login from './Home/Login';
import { getAuthenticatedStudent } from '~store/actions/AuthAction';
import { useDispatch, useSelector } from 'react-redux';
import { TDispatch } from '~store';


const Pages: FC = () => {

  const { auth } = useSelector<TRootReducers, TRootReducers>(state => state);

  const dispatch = useDispatch<TDispatch>();

  const fetchUser = useCallback(async () => {
    await dispatch(getAuthenticatedStudent());
  }, [dispatch]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  console.log(auth);

  return (
    <Switch>
      <Route path="/home" >
        <Container>
          <Switch>
            {auth.status === 'verifying' && <>Loading...</>}
            {auth.status === 'not-authenticated' && (
              <>
                <Route path="/home/login" component={Login} />
              </>
            )}
            {auth.status === 'authenticated' && (
              <>
                <Redirect path="/home/login" to="/home" />

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
