import React, { FC, Suspense, useCallback, useEffect } from 'react';
import { Input, Table } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';

import Edit from './components/EditStudent';
import Delete from './components/DeleteStudent';

import { formatDateToYMD } from '~helpers';
import { Paginate } from '~components';
import { getStudents } from '~store/actions/StudentsAction';
import { TDispatch } from '~store';
import AddStudent from './components/AddStudent';
import { useLocation } from 'react-router-dom';

type TProps = {}

/**
 * A Component for lists of students
 *
 * @returns FC
 */
const StudentLists: FC<TProps> = () => {

  /**
   * Route params
   */
  const currentPage = parseInt((new URLSearchParams(useLocation().search)).get('page') as string);

  /**
   * Student State
   */
  const { student, page } = useSelector<TRootReducers, TRootReducers>(state => state);

  /**
   * For dispatching actions
   */
  const dispatch = useDispatch<TDispatch>();

  const fetchData = useCallback(async () => {
    dispatch({
      type: 'STORE_CURRENT_PAGE',
      payload: {
        current_page: currentPage
      }
    });

    await dispatch(getStudents());
  }, [currentPage, dispatch]);

  const searchOnInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'STORE_SEARCH_INPUT',
      payload: {
        search_input: event.currentTarget.value
      }
    });
    dispatch(getStudents());
  };

  /**
   * Get All Student before rendering component
   */
  useEffect(() => {
    (async () => {
      try {
        fetchData();
      } catch (error) {
        alert(error.message);
      }
    })();
  }, [fetchData]);

  return (
    <>
    <div className="d-flex justify-content-between my-3">
        <div>
          <Input 
            placeholder="Search Students" 
            value={page.search_input}
            onChange={searchOnInputChange}
          />
        </div>
        <div>
          <AddStudent />
        </div>
      </div>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th scope="col">Student ID</th>
            <th scope="col">Last Name</th>
            <th scope="col">Middle Name</th>
            <th scope="col">First Name</th>
            <th scope="col">Date Enrolled</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <Suspense fallback={
            <tr>
              <td colSpan={5}>Loading</td>
            </tr>
          }>
            {student.students.length ? student.students.map((student) => (
              <tr key={student.student_id}>
                <th scope="row">{student.student_id}</th>
                <td>{student.last_name}</td>
                <td>{student.middle_name}</td>
                <td>{student.first_name}</td>
                <td>{formatDateToYMD(student.created)}</td>
                <td>
                  <Edit student={student} />
                  <Delete student={student} />
                </td>
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
        url="/admin/students" 
        totalPages={student.total_pages}
        onClick={fetchData}
      />
    </>
  );
};

export default StudentLists;
