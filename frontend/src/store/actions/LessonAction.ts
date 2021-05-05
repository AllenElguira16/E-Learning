import axios, { AxiosResponse } from 'axios';

type TDispatch = {
  type: string;
  payload: any;
}

export const getLessons = async (subjectId: number, page: number): Promise<TDispatch | void> => {
  type TResponse = AxiosResponse<IResponse<TLessonReducer>>
  const limit = 5;
  const { data: { details } }: TResponse = await axios.get(`/rest/subjects/${subjectId}/lessons?page=${page}&limit=${limit}`);

  
  if (details) {
    if (page > details.total_pages && details.total_pages > 0) {
      throw new Error(`Page must be lesser than ${page}`);
    }
    
    return {
      type: 'STORE_LESSONS',
      payload: {
        lessons: details.lessons,
        total_pages: details.total_pages,
      }
    };
  }
};


export const addLesson = async (subjectId: number, formData: FormData, page: number): Promise<[IResponse, TDispatch | void]> => {
  const { data: axiosData } = await axios.post(`/rest/subjects/${subjectId}/lessons`, formData);

  return [axiosData, await getLessons(subjectId, page)];
};

export const editLesson = async (subjectId: number, lessonId: ILesson['lesson_id'], formData: FormData, page: number): Promise<[IResponse, TDispatch | void]> => {
  const { data: axiosData } = await axios.put(`/rest/subjects/${subjectId}/lessons/${lessonId}`, formData);

  return [axiosData, await getLessons(subjectId, page)];
};

export const deleteLesson = async (subjectId: number, lessonId: ILesson['lesson_id'], page: number): Promise<[IResponse, TDispatch | void]> => {
  const { data: axiosData }: AxiosResponse<IResponse> = await axios.delete(`/rest/subjects/${subjectId}/lessons/${lessonId}`);

  return [axiosData, await getLessons(subjectId, page)];
};
