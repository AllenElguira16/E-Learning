import type { Dispatch } from 'redux';

export const showHelloWorld = () => async (dispatch: Dispatch) => {
  dispatch({
    type: 'SHOW_HELLO_WORLD'
  });
};

export const hideHelloWorld = () => async (dispatch: Dispatch) => {
  dispatch({
    type: 'HIDE_HELLO_WORLD'
  });
};
