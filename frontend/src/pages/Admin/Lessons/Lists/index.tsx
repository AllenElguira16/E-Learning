import React, { FC, Suspense, useEffect } from 'react';
import { getLessons } from '../../../../store/actions/LessonAction';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { formatDateToYMD } from '../../../../helpers';
import { Paginate } from '../../../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 *
 * @constructor
 */
const Lists: FC = () => {
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
    window.location.href = `/admin/lessons/${lessonId}`;
  };

  /**
   * Get Lessons
   */
  useEffect(() => {
    (async () => {
      try {
        dispatch(await getLessons(page));
      } catch (error) {
        alert(error.message);
      }
    })();
  }, [dispatch, page]);

  return (
    <>
      <Table striped bordered responsive hover>
        <thead>
        <tr>
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
            <tr key={lesson.lesson_id} className="tb-lesson-row" onClick={() => gotoPreview(lesson.lesson_id)}>
              <th scope="row">{lesson.lesson_id}</th>
              <td>{lesson.title}</td>
              <td>{formatDateToYMD(lesson.created)}</td>
              <td>
                <Button color="warning">
                  <FontAwesomeIcon icon="edit" fixedWidth />
                </Button>
                <Button color="danger">
                  <FontAwesomeIcon icon="trash" fixedWidth />
                </Button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan={6}>There are no students or the page exceeded</td>
            </tr>
          )}
        </Suspense>
        </tbody>
      </Table>
      <Paginate page={page} totalPages={lesson.total_pages} />
    </>
  );
};

export default Lists;
