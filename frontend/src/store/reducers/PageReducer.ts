import { Reducer } from 'redux';

const initialState: TPageReducer = {
  search_input: '',
  current_page: 1,
};

type TPayload = {
  type: string;
  payload: TPageReducer
}

const PageReducer: Reducer<TPageReducer, TPayload> = (
  state = initialState,
  {type, payload}
): TPageReducer => {
  switch (type) {
    case 'STORE_SEARCH_INPUT':
      return {
        ...state,
        search_input: payload.search_input,
      };
    case 'STORE_CURRENT_PAGE':
      console.log(payload);
      return {
        ...state,
        current_page: payload.current_page,
      };
    case 'RESTORE_PAGE_INFO': 
      return initialState;
    default:
      return state;
  }
};

export default PageReducer;
