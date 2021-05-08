import axios, { AxiosResponse } from 'axios';
// import { Action, AnyAction, Dispatch } from 'redux';
// import { ThunkAction } from 'redux-thunk';

import { TThunkAction } from '~store';

// type TDispatch<T = any> = Dispatch<Action & {payload: T}>;


export const getLessons = (subjectId: number): TThunkAction<Promise<void>> => {
  return async (dispatch, state) => {
    
  };
};
