import React, { FC, Suspense, useEffect } from 'react';
import { Table } from 'reactstrap';
import { useParams } from 'react-router-dom';

import { formatDateToYMD, transformID } from '../../../../helpers';
import Edit from '../Edit';
import Paginate from './Paginate';
import Delete from '../Delete';
import { useSelector, useDispatch } from 'react-redux';
import { getStudents } from '../../../../store/actions/StudentAction';
// import { getStudentList } from '../../../../api';
// import { getStudentList } from '../../../../api';

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
  const { page } = useParams<{ page: string; }>();

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
        dispatch(await getStudents(parseInt(page)));
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
            {student.students !== null && student.students.map((student) => (
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
            ))}
          </Suspense>
        </tbody>
      </Table>
      <Paginate page={parseInt(page)} totalPages={student.total_pages} />
    </>
  );
};

export default Lists;
