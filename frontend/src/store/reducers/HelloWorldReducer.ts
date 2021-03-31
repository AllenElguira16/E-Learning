import { Reducer } from "redux";

const HelloWorldReducer: Reducer = (state: THelloWorldToggle = false, action) => {
  switch (action.type) {
    case 'TOGGLE_HELLO_WORLD':
      return !state;
    default:
      return state;
  }
}

export default HelloWorldReducer;
