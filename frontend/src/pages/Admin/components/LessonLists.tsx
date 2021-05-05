import React, { FC, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { Table } from 'reactstrap';

import { getLessons } from '~store/actions/LessonAction';
import { formatDateToYMD } from '~helpers';
import { Paginate } from '~components';

import Edit from './EditLesson';
import Delete from './DeleteLesson';

/**
 *
 * @constructor
 */
const LessonLists: FC = () => {

  const { subject_id } = useParams<{ subject_id: string }>();

  /**
   * Route params
   */
  const page = parseInt((new URLSearchParams(useLocation().search)).get('page') as string);

  /**
   * Student State
   */
  const { lesson } = useSelector<TRootReducers, TRootReducers>(state => state);

  /**
   * For dispatching actions
   */
  const dispatch = useDispatch();


  const gotoPreview = (lessonId: number) => {
    window.location.href = `/admin/subjects/${subject_id}/lessons/${lessonId}`;
  };

  /**
   * Get Lessons
   */
  useEffect(() => {
    (async () => {
      try {
        dispatch(await getLessons(parseInt(subject_id), page));
      } catch (error) {
        alert(error.message);
      }
    })();
  }, [dispatch, page, subject_id]);

  return (
    <>
      <Table striped bordered responsive hover>
        <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Title</th>
          <th scope="col">Created</th>
          <th scope="col">Action</th>
        </tr>
        </thead>
        <tbody>
        <Suspense fallback={
          <tr>
            <td colSpan={5}>Loading</td>
          </tr>
        }>
          {lesson.lessons.length ? lesson.lessons.map((lesson) => (
            <tr key={lesson.lesson_id} className="tb-lesson-row">
              <th onClick={() => gotoPreview(lesson.lesson_id)} scope="row">{lesson.lesson_id}</th>
              <td onClick={() => gotoPreview(lesson.lesson_id)}>{lesson.title}</td>
              <td onClick={() => gotoPreview(lesson.lesson_id)}>{formatDateToYMD(lesson.created)}</td>
              <td>
                <Edit lesson={{
                  lesson_id: lesson.lesson_id,
                  title: lesson.title,
                  description: lesson.description,
                  file: lesson.file
                }} />
                <Delete lesson_id={lesson.lesson_id} />
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan={6}>There are no lessons or the page exceeded</td>
            </tr>
          )}
        </Suspense>
        </tbody>
      </Table>
      <Paginate page={page} url={`/admin/subjects/${subject_id}`} totalPages={lesson.total_pages} />
    </>
  );
};

export default LessonLists;
