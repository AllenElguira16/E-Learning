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
  const { data: axiosData } = await axios.post('/rest/lesson/add', formData);

  return [axiosData, await getLessons(page)];
};

export const editLesson = async (lesson_id: ILesson['lesson_id'], formData: FormData, page: number): Promise<[IResponse, TDispatch | void]> => {
  const { data: axiosData } = await axios.put(`/rest/lesson/edit/${lesson_id}`, formData);

  return [axiosData, await getLessons(page)];
};

export const deleteLesson = async (lesson_id: ILesson['lesson_id'], page: number): Promise<[IResponse, TDispatch | void]> => {
  const { data: axiosData }: AxiosResponse<IResponse> = await axios.delete(`/rest/lesson/delete/${lesson_id}`);

  return [axiosData, await getLessons(page)];
};
