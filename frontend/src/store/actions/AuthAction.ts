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
    
      await dispatch(getAuthenticatedStudent());

      return data.message;
    } catch (error) {
      alert(error.response.data.message);
    }
  };
};

export const logoutStudent = (): TThunkAction<Promise<AxiosResponse['data']>, {
  payload: TAuthReducer
}> => {
  return async (dispatch) => {
    try {
      const url = '/rest/auth/logout';
      const { data }: AxiosResponse<IResponse> = await axios.post(url);
    
      dispatch({
        type: 'STORE_LOGIN_STATUS',
        payload: {
          status: 'not-authenticated'
        }
      });

      return data.message;
    } catch (error) {
      return error.response.data.message;
    }
  };
};

export const getAuthenticatedStudent = (): TThunkAction<Promise<AxiosResponse['data']>, {
  payload: TAuthReducer
}> => {
  return async (dispatch) => {
    try {  

      const url = '/rest/auth';
      const { data }: AxiosResponse<IResponse> = await axios.get(url);
    
      dispatch({
        type: 'STORE_LOGIN_STATUS',
        payload: {
          status: 'authenticated',
          student: data.details.student
        }
      });

      return data.message;
    } catch (error) {
      dispatch({
        type: 'STORE_LOGIN_STATUS',
        payload: {
          status: 'not-authenticated'
        }
      });

      return error.response.data.message;
    }
  }; 
};

export const logout = (): TThunkAction<Promise<AxiosResponse['data']>, {
  payload: TAuthReducer
}> => {
  return async (dispatch) => {
    try {  

      const url = '/rest/auth/logout';
      const { data }: AxiosResponse<IResponse> = await axios.get(url);
    
      dispatch({
        type: 'STORE_LOGIN_STATUS',
        payload: {
          status: 'not-authenticated',
          student: undefined
        }
      });

      return data.message;
    } catch (error) {
      return error.response.data.message;
    }
  }; 
};
