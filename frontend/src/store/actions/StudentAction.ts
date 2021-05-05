import axios, { AxiosResponse } from 'axios';

type TDispatch = {
  type: string;
  payload: any;
}

export const getStudents = async (page: number): Promise<TDispatch> =>  {
  const limit = 5;
  const { data: { details } }: AxiosResponse<IResponse> = await axios.get(`/rest/students?page=${page}&limit=${limit}`);

  if (page > details.total_pages && details.total_pages > 0) {
    throw new Error(`Page must be lesser than ${page}`);
  }

  return {
    type: 'STORE_STUDENT',
    payload: {
      students: details.students,
      total_pages: details.total_pages,
    }
  };
};

export const addStudent = async (newStudentData: TInput, page: number): Promise<[IResponse, TDispatch]> => {
  const { data: axiosData }: AxiosResponse<IResponse> = await axios.post('/rest/students', newStudentData);

  return [axiosData, await getStudents(page)];
};

export const editStudent = async (student_id: IStudent['student_id'], studentData: TInput, page: number): Promise<[IResponse, TDispatch]> => {
  type TResponse = AxiosResponse<IResponse<{ students: IStudent[]}>>;
  const { data: axiosData }: TResponse = await axios.put(`/rest/students/${student_id}`, studentData);

  return [axiosData, await getStudents(page)];
};

export const deleteStudent = async (student_id: IStudent['student_id'], page: number): Promise<[IResponse, TDispatch]> => {
  const { data: axiosData }: AxiosResponse<IResponse> = await axios.delete(`/rest/students/${student_id}`);

  return [axiosData, await getStudents(page)];
};


