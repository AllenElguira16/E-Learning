import React, { FC, Suspense, useEffect } from 'react';
import { Table } from 'reactstrap';
import { useLocation } from 'react-router-dom';

import { formatDateToYMD, transformID } from '../../../../helpers';
import Edit from '../Edit';
import { Paginate } from '../../../../components';
import Delete from '../Delete';
import { useSelector, useDispatch } from 'react-redux';
import { getStudents } from '../../../../store/actions/StudentAction';

type TProps = {}

/**
 * A Component for lists of students
 *
 * @returns FC
 */
const Lists: FC<TProps> = () => {
  /**
   * Route params
   */
  const page = parseInt((new URLSearchParams(useLocation().search)).get('page') as string);

  /**
   * Student State
   */
  const { student } = useSelector<TRootReducers, TRootReducers>(state => state);

  /**
   * For dispatching actions
   */
  const dispatch = useDispatch();

  /**
   * Get All Student before rendering component
   */
  useEffect(() => {
    (async () => {
      try {
        dispatch(await getStudents(page));
      } catch (error) {
        alert(error.message);
      }
    })();
  }, [dispatch, page]);

  return (
    <>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th scope="col">Student ID</th>
            <th scope="col">First Name</th>
            <th scope="col">Middle Name</th>
            <th scope="col">Last Name</th>
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
                <th scope="row">{transformID(student.student_id)}</th>
                <td>{student.first_name}</td>
                <td>{student.middle_name}</td>
                <td>{student.last_name}</td>
                <td>{formatDateToYMD(student.created)}</td>
                <td>
                  <Edit student={student} />
                  <Delete student={student} />
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
      <Paginate page={page} totalPages={student.total_pages} />
    </>
  );
};

export default Lists;
