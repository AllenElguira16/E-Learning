import axios, { AxiosResponse } from 'axios';
import { TThunkAction } from '~store';

export const getStudents = (): TThunkAction<Promise<void>> => {
  return async (dispatch, state) => {
    const limit = 5;
    const { data: { details } }: AxiosResponse<IResponse> = await axios.get(`/rest/students?page=${state().page.current_page}&limit=${limit}`);
  
    if (state().page.current_page > details.total_pages && details.total_pages > 0) {
      throw new Error(`Page must be lesser than ${state().page.current_page}`);
    }
  
    dispatch({
      type: 'STORE_STUDENT',
      payload: {
        students: details.students,
        total_pages: details.total_pages,
      }
    });
  };
};

export const addStudent = (
  newStudentData: TInput
): TThunkAction<Promise<AxiosResponse<IResponse>['data']>> => { 
  return async (dispatch) => {
    const { data } = await axios.post('/rest/students', newStudentData);

    await dispatch(getStudents());

    return data;
  };
};

export const editStudent = (
  student_id: IStudent['student_id'], 
  studentData: TInput
): TThunkAction<Promise<AxiosResponse<IResponse>['data']>> => {

  return async (dispatch) => {
    const { data } = await axios.put(`/rest/students/${student_id}`, studentData);
  
    await dispatch(getStudents());

    return data;
  };
};

export const deleteStudent = (
  student_id: IStudent['student_id']
): TThunkAction<Promise<AxiosResponse<IResponse>['data']>> => {

  return async (dispatch) => {
    const { data } = await axios.delete(`/rest/students/${student_id}`);
  
    await dispatch(getStudents());
  
    return data;
  };
};
