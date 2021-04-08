import React, { FC, useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { getStudentList } from '../../../api';
import { formatDateToYMD } from '../../../helpers';

const Lists: FC = () => {
  const [studentList, setStudentList] = useState<IStudent[]>([]);
 
  useEffect(() => {
    (async () => {
      const studentList = await getStudentList();
      if (studentList) {
        setStudentList(studentList)
      }
    })()
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
        </tr>
      </thead>
      <tbody>
        {studentList.length && studentList.map((student) => (
          <tr>
            <td>{student.student_id}</td>
            <td>{student.first_name}</td>
            <td>{student.middle_name}</td>
            <td>{student.last_name}</td>
            <td>{formatDateToYMD(student.created)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default Lists;
