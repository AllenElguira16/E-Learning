/**
 * Handles API Requests
 */

import axios from "axios"

export const getStudentList = async (): Promise<IStudent[]> => {
  const { data } = await axios.get('/rest/student/list');

  return data
}