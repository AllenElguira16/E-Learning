import axios, { AxiosResponse } from 'axios';
import { TThunkAction } from '~store';

// type TThunkSubjectAction<T = any> = TThunkAction<Promise<AxiosResponse<IResponse<T>>>>;

export const getSubjects = (): TThunkAction => {
  return async (dispatch, state) => {
    const limit = 5;

    const { current_page, search_input } = state().page;

    const url = `/rest/subjects?page=${current_page}&limit=${limit}&search=${search_input}`;
    const { data: { details } } = await axios.get(url);
    
    if (details) {
      if (current_page > details.total_pages && details.total_pages > 0) {
        throw new Error(`Page must be lesser than ${current_page}`);
      }

      dispatch({
        type: 'STORE_SUBJECTS',
        payload: {
          subjects: details.subjects,
          total_pages: details.total_pages,
        }
      });
    }
  };
};

export const addSubject = (input: TSubjectInput): TThunkAction<Promise<AxiosResponse['data']>> => {
  return async (dispatch) => {
    const { data: axiosData } = await axios.post('/rest/subjects', input);
  
    await dispatch(getSubjects());

    return axiosData;
  };
};

export const editSubject = (subject_id: number, input: TSubjectInput): TThunkAction<Promise<AxiosResponse['data']>> => {
  return async (dispatch) => {
    const { data: axiosData } = await axios.put('/rest/subjects', {
      subject_id,
      ...input
    });

    await dispatch(getSubjects());
  
    return axiosData;
  };
};

export const deleteSubject = (subject_id: ISubject['subject_id']): TThunkAction<Promise<AxiosResponse['data']>> => {
  return async (dispatch) => {
    const { data: axiosData } = await axios.delete(`/rest/subjects/${subject_id}`);
  
    await dispatch(getSubjects());

    return axiosData;
  };
};
