import React, { FC, useCallback, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'reactstrap';

import AdminNavigation from './Admin/components/AdminNavigation';
import AdminPreviewLesson from './Admin/PreviewLesson';
import AdminSubjectLists from './Admin/SubjectLists';
import AdminLessonLists from './Admin/LessonLists';
import AdminStudentLists from './Admin/StudentLists';

import HomeNavigation from './Home/components/HomeNavigation';
import HomeLogin from './Home/Login';
import HomeMain from './Home/Main';
import HomeStudentInfo from './Home/StudentInfo';
import HomePreviewLesson from './Home/PreviewLesson';
import HomeSubjectLists from './Home/SubjectLists';
import HomeLessonLists from './Home/LessonLists';

import { getAuthenticatedStudent } from '~store/actions/AuthAction';
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

  return (
    <Switch>
      <Route path="/home" >
        <HomeNavigation />
        <Container>
            {auth.status === 'verifying' && <>Loading...</>}
            {auth.status === 'not-authenticated' && (
              <Switch>
                <Route exact path="/home/login" component={HomeLogin} />
                <Route exact path="/home" component={HomeMain} />
              </Switch>
            )}
            {auth.status === 'authenticated' && (
              <Switch>
                {/* Admin Lesson Preview */}
                <Route path="/home/subjects/:subject_id/lessons/:lesson_id" component={HomePreviewLesson} />

                {/* Lessons */}
                <Route path="/home/subjects/:subject_id/lessons" component={HomeLessonLists} />

                {/* Subject List */}
                <Route path="/home/subjects" component={HomeSubjectLists} />

                <Route path="/home/student" component={HomeStudentInfo} />
                <Route exact path="/home" component={HomeMain} />
              </Switch>
            )}
        </Container>
      </Route>
      <Route path="/admin">
        <AdminNavigation/>
        <Container>
          <Switch>
            <Redirect exact path="/admin" to="/admin/students?page=1" />

            {/* Students List */}
            <Route path="/admin/students" component={AdminStudentLists} />

            {/* Admin Lesson Preview */}
            <Route path="/admin/subjects/:subject_id/lessons/:lesson_id" component={AdminPreviewLesson} />

            {/* Lessons */}
            <Route path="/admin/subjects/:subject_id/lessons" component={AdminLessonLists} />

            {/* Subject List */}
            <Route path="/admin/subjects" component={AdminSubjectLists} />

          </Switch>
        </Container>
      </Route>
    </Switch>
  );
};

export default Pages;
