import axios, { AxiosResponse } from 'axios';

type TDispatch = {
  type: string;
  payload: any;
}

export const getStudents = async (page: number): Promise<TDispatch> =>  {
  const limit = 5;
  const { data: axiosData }: AxiosResponse<IResponse> = await axios.get(`/rest/student/list?page=${page}&limit=${limit}`);

  return {
    type: 'STORE_STUDENT',
    payload: {
      students: axiosData.details.students,
      total_pages: axiosData.details.total_pages,
    }
  };
};

export const addStudent = async (newStudentData: TInput, page: number): Promise<[IResponse, TDispatch]> => {
  const { data: axiosData }: AxiosResponse<IResponse> = await axios.post('/rest/student/add', newStudentData);

  return [axiosData, await getStudents(page)];
};

export const editStudent = async (student_id: IStudent['student_id'], studentData: TInput, page: number): Promise<[IResponse, TDispatch]> => {
  type TResponse = AxiosResponse<IResponse<{ students: IStudent[]}>>;
  const { data: axiosData }: TResponse = await axios.put(`/rest/student/edit/${student_id}`, studentData);

  return [axiosData, await getStudents(page)];
};

export const deleteStudent = async (student_id: IStudent['student_id'], page: number): Promise<[IResponse, TDispatch]> => {
  const { data: axiosData }: AxiosResponse<IResponse> = await axios.delete(`/rest/student/delete/${student_id}`);

  return [axiosData, await getStudents(page)];
};


