import React, { FC, Suspense, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Table } from 'reactstrap';
import { getStudentList } from '../../../api';
import { formatDateToYMD, transformID } from '../../../helpers';
import Edit from './Edit';

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
  const [studentList, setStudentList] = useState<IStudent[]>([]);

  /**
   * Get All Student before rendering component
   */
  useEffect(() => {
    (async () => {
      const studentList = await getStudentList();
      if (studentList) {
        setStudentList(studentList);
      }
    })();
  }, []);

  return (
    <Table>
      <thead>
        <tr>
          <th>Student ID</th>
          <th>First Name</th>
          <th>Middle Name</th>
          <th>Last Name</th>
          <th>Date Enrolled</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <Suspense fallback={
          <tr>
            <td colSpan={5}>Loading</td>
          </tr>
        }>
          {studentList.length !== 0 && studentList.map((student) => (
            <tr key={student.student_id}>
              <td>{transformID(student.student_id)}</td>
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
  );
};

export default Lists;
