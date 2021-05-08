import React, { FC, Suspense, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Input, Table } from 'reactstrap';

import { getSubjects } from '~store/actions/SubjectsAction';
import { formatDateToYMD } from '~helpers';
import { Paginate } from '~components';
import EditSubject from './EditSubject';
import DeleteSubject from './DeleteSubject';
import AddSubject from './AddSubjects';
import { TDispatch } from '~store';

/**
 *
 * @constructor
 */
const SubjectLists: FC = () => {
  /**
   * Route params
   */
  const currentPage = parseInt((new URLSearchParams(useLocation().search)).get('page') as string);

  /**
   * Student State
   */
  const { subject, page } = useSelector<TRootReducers, TRootReducers>(state => state);

  /**
   * For dispatching actions
   */
  const dispatch = useDispatch<TDispatch>();


  const gotoPreview = (subjectId: number) => {
    window.location.href = `/admin/subjects/${subjectId}/lessons?page=1`;
  };

  const fetchData = useCallback(async () => {
    try {
      dispatch({
        type: 'STORE_CURRENT_PAGE',
        payload: {
          current_page: currentPage
        }
      });

      await dispatch(getSubjects());
    } catch (error) {
      alert(error.message);
    }
  }, [currentPage, dispatch]);

  const searchOnInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'STORE_SEARCH_INPUT',
      payload: {
        search_input: event.currentTarget.value
      }
    });
    dispatch(getSubjects());
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
            placeholder="Search Subjects" 
            value={page.search_input}
            onChange={searchOnInputChange} 
          />
        </div>
        <div>
          <AddSubject />
        </div>
      </div>
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
          {(subject.subjects && subject.subjects.length) ? subject.subjects.map((subject) => (
            <tr key={subject.subject_id} className="tb-lesson-row" onClick={() => gotoPreview(subject.subject_id)} >
              <th scope="row">{subject.subject_id}</th>
              <td>{subject.title}</td>
              <td>{formatDateToYMD(subject.created)}</td>
              <td onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}>
                <EditSubject subject={subject} />
                <DeleteSubject subject_id={subject.subject_id} />
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
      <Paginate 
        url="/admin/subjects" 
        totalPages={subject.total_pages}
        onClick={fetchData}
      />
    </>
  );
};

export default SubjectLists;
