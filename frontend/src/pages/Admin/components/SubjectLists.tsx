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

/**
 *
 * @constructor
 */
const SubjectLists: FC = () => {
  /**
   * Route params
   */
  const page = parseInt((new URLSearchParams(useLocation().search)).get('page') as string);

  /**
   * Student State
   */
  const { subject } = useSelector<TRootReducers, TRootReducers>(state => state);

  /**
   * For dispatching actions
   */
  const dispatch = useDispatch();


  const gotoPreview = (subjectId: number) => {
    window.location.href = `/admin/subjects/${subjectId}?page=1`;
  };

  const fetchData = useCallback(async (search = '') => {
    try {
      dispatch(await getSubjects(page, search));

      // console.log(subject);
    } catch (error) {
      alert(error.message);
    }
  }, [dispatch, page]);

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
          <Input placeholder="Search Subjects" onChange={async (event) => {
            await fetchData(event.currentTarget.value);
          }} />
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
      <Paginate page={page} url="/admin/subjects" totalPages={subject.total_pages} />
    </>
  );
};

export default SubjectLists;
