import axios, { AxiosResponse } from 'axios';

import { TThunkAction } from '~store';

export const getLessons = (subjectId: number): TThunkAction<Promise<void>> => {
  return async (dispatch, state) => {
    type TResponse = AxiosResponse<IResponse<TLessonReducer>>
    const limit = 5;

    const { current_page, search_input } = state().page;

    const url = `/rest/subjects/${subjectId}/lessons?page=${current_page}&limit=${limit}&search=${search_input}`;

    const { data: { details } }: TResponse = await axios.get(url);
    
    if (details) {
      if (current_page > details.total_pages && details.total_pages > 0) {
        throw new Error(`Page must be lesser than ${current_page}`);
      }
      
      dispatch({
        type: 'STORE_LESSONS',
        payload: {
          lessons: details.lessons,
          total_pages: details.total_pages,
        }
      });
    }
  };
};

export const addLesson = (
  subjectId: number, 
  formData: FormData
): TThunkAction<Promise<AxiosResponse<IResponse>['data']>> => {
  return async (dispatch) => {
    const { data } = await axios.post(`/rest/subjects/${subjectId}/lessons`, formData);

    dispatch(getLessons(subjectId));

    return data;
  };
};

export const editLesson = (
  subjectId: number, 
  lessonId: ILesson['lesson_id'], 
  formData: FormData
): TThunkAction<Promise<AxiosResponse<IResponse>['data']>> => {
  return async (dispatch) => {
    const url = `/rest/subjects/${subjectId}/lessons/${lessonId}`;
    const { data } = await axios.put(url, formData);
  
    dispatch(getLessons(subjectId));

    return data;
  };
};

export const deleteLesson = (
  subjectId: number, 
  lessonId: ILesson['lesson_id']
): TThunkAction<Promise<AxiosResponse>> => {
  return async (dispatch) => {
    const { data }: AxiosResponse = await axios.delete(`/rest/subjects/${subjectId}/lessons/${lessonId}`);
  
    dispatch(getLessons(subjectId));

    return data;
  };
};
