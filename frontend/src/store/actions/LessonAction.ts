import axios, { AxiosResponse } from 'axios';

type TDispatch = {
  type: string;
  payload: any;
}

export const getLessons = async (page: number): Promise<TDispatch | void> => {
  type TResponse = AxiosResponse<IResponse<TLessonReducer>>
  const limit = 5;
  const { data: { details } }: TResponse = await axios.get(`/rest/lesson/list?page=${page}&limit=${limit}`);

  
  if (details) {
    if (page > details.total_pages) throw new Error(`Page must be lesser than ${page}`);

    return {
      type: 'STORE_LESSONS',
      payload: {
        lessons: details.lessons,
        total_pages: details.total_pages,
      }
    };
  }
};


export const addLesson = async (formData: FormData, page: number): Promise<[IResponse, TDispatch | void]> => {
  const { data: axiosData } = await axios.post('/rest/lesson/upload', formData);

  return [axiosData, await getLessons(page)];
};

export const editLesson = async (lesson_id: ILesson['lesson_id'], formData: FormData, page: number): Promise<[IResponse, TDispatch | void]> => {
  const { data: axiosData } = await axios.put(`/rest/lesson/upload/${lesson_id}`, formData);

  return [axiosData, await getLessons(page)];
};

// export const deleteStudent = async (student_id: IStudent['student_id'], page: number): Promise<[IResponse, TDispatch | void]> => {
//   const { data: axiosData }: AxiosResponse<IResponse> = await axios.delete(`/rest/student/delete/${student_id}`);

//   return [axiosData, await getLessons(page)];
// };
