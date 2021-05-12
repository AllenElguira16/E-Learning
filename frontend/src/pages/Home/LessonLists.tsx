import React, { FC, Suspense, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { Input, Table } from 'reactstrap';

import { getLessons } from '~store/actions/LessonAction';
import { formatDateToYMD } from '~helpers';
import { Paginate } from '~components';

import { TDispatch } from '~store';

/**
 *
 * @constructor
 */
const LessonLists: FC = () => {

  const { subject_id } = useParams<{ subject_id: string }>();

  /**
   * Route params
   */
  const currentPage = parseInt((new URLSearchParams(useLocation().search)).get('page') as string);

  /**
   * Student State
   */
  const { lesson, page } = useSelector<TRootReducers, TRootReducers>(state => state);

  /**
   * For dispatching actions
   */
  const dispatch = useDispatch<TDispatch>();

  const gotoPreview = (lessonId: number) => {
    window.location.href = `/admin/subjects/${subject_id}/lessons/${lessonId}`;
  };

  const fetchData = useCallback(async () => {
    try {
      dispatch({
        type: 'STORE_CURRENT_PAGE',
        payload: {
          current_page: currentPage
        }
      });
      dispatch(getLessons(parseInt(subject_id)));
    } catch (error) {
      alert(error.message);
    }
  }, [dispatch, currentPage, subject_id]);

  const searchOnInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'STORE_SEARCH_INPUT',
      payload: {
        search_input: event.currentTarget.value
      }
    });
    dispatch(getLessons(parseInt(subject_id)));
  };

  /**
   * Get Lessons
   */
  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, [fetchData]);

  return (
    <>
    <div className="d-flex justify-content-between my-3">
        <div>
          <Input 
            placeholder="Search Lessons" 
            value={page.search_input}
            onChange={searchOnInputChange} 
          />
        </div>
      </div>
      <Table striped bordered responsive hover>
        <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Title</th>
          <th scope="col">Created</th>
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
            </tr>
          )) : (
            <tr>
              <td colSpan={6}>There are no results or the page exceeded</td>
            </tr>
          )}
        </Suspense>
        </tbody>
      </Table>
      <Paginate 
        url={`/admin/subjects/${subject_id}/lessons`} 
        onClick={fetchData}
        totalPages={lesson.total_pages}
      />
    </>
  );
};

export default LessonLists;
