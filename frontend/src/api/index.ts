/**
 * Handles API Requests
 */

import axios, { AxiosResponse } from 'axios';

export const getStudentList = async (): Promise<IStudent[]|undefined> => {
  try {
    
    const { data: axiosData }: AxiosResponse<IResponse<{ students: IStudent[]}>> = await axios.get('/rest/student/list');
  
    return axiosData.data?.students;
  } catch (error) {
    alert(error.message);
  }
};

export const addStudent = async (newStudentData: TInput): 
  Promise<IResponse | IResponse<TValidationObject<TInput>>> => {
  try {
    const { data: axiosData }: AxiosResponse<IResponse<{ students: IStudent[]}>> = await axios.post('/rest/student/add', newStudentData);
    // console.log(axiosData);
    return axiosData;
  } catch (error) {
    return error.response.data.errors;
  }
};

export const editStudent = async (student_id: IStudent['student_id'], studentData: TInput): 
  Promise<IResponse | IResponse<TValidationObject<TInput>>> => {
  try {
    const { data: axiosData }: AxiosResponse<IResponse<{ students: IStudent[]}>> = await axios.put('/rest/student/edit/' + student_id, studentData);
    // console.log(axiosData);
    return axiosData;
  } catch (error) {
    return error.response.data.errors;
  }
};
