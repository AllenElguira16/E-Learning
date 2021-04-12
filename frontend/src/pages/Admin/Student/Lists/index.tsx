import React, { FC, Suspense, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Table } from 'reactstrap';
import { useParams } from 'react-router-dom';

import { getStudentList } from '../../../../api';
import { formatDateToYMD, transformID } from '../../../../helpers';
import Edit from '../Edit';
import Paginate from './Paginate';

type TProps = {}

/**
 * A Component for lists of students
 * 
 * @returns FC
 */
const Lists: FC<TProps> = () => {
  /**
   * Student State 
   */
  const [studentData, setStudentData] = useState<{ students: IStudent[], total_pages: number }>({
    students: [],
    total_pages: 0
  });

  const {page} = useParams<{page: string}>();

  /**
   * Get All Student before rendering component
   */
  useEffect(() => {
    (async () => {
      const studentData = await getStudentList(parseInt(page));
      if (studentData) {
        setStudentData(studentData);
      }
    })();
  }, [page]);

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
            {studentData.students !== null && studentData.students.map((student) => (
              <tr key={student.student_id}>
                <th scope="row">{transformID(student.student_id)}</th>
                <td>{student.first_name}</td>
                <td>{student.middle_name}</td>
                <td>{student.last_name}</td>
                <td>{formatDateToYMD(student.created)}</td>
                <td>
                  <Edit student={student} />
                  <Button color="danger">
                    <FontAwesomeIcon icon="trash" />
                  </Button>
                </td>
              </tr>
            ))}
          </Suspense>
        </tbody>
      </Table>
      <Paginate page={parseInt(page)} totalPages={studentData.total_pages} />
    </>
  );
};

export default Lists;
