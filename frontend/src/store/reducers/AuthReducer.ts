import { Reducer } from 'redux';

const initialState: TAuthReducer = {
  status: 'verifying'
};

type TPayload = {
  type: string;
  payload: TAuthReducer
}

const AuthReducer: Reducer<TAuthReducer, TPayload> = (state = initialState, {type, payload}): TAuthReducer => {
  switch (type) {
    case 'STORE_LOGIN_STATUS':
      return {
        status: payload.status
      };
    default:
      return state;
  }
};

export default AuthReducer;
