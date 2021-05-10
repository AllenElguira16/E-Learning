import axios, { AxiosResponse } from 'axios';
import { TThunkAction } from '~store';

export const loginStudent = (school_id: string, password: string): TThunkAction<Promise<AxiosResponse['data']>> => {
  return async (dispatch) => {
    try {
      const url = '/rest/auth/login';
      const { data }: AxiosResponse<IResponse> = await axios.post(url, {
        school_id,
        password
      });
    
      dispatch({
        type: 'STORE_LOGIN_STATUS',
        payload: {
          status: 'authenticated'
        }
      });

      return data.message;
    } catch (error) {
      alert(error.response.data.message);
    }
  };
};

export const getAuthenticatedStudent = (): TThunkAction<Promise<AxiosResponse['data']>, {
  payload: TAuthReducer
}> => {
  return async (dispatch) => {

    const url = '/rest/auth';
    const { data }: AxiosResponse<IResponse> = await axios.get(url);
  
    dispatch({
      type: 'STORE_LOGIN_STATUS',
      payload: {
        status: 'authenticated'
      }
    });

    return data;
  };
};
