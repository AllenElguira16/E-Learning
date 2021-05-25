import { Reducer } from 'redux';

const initialState: TStudentsReducer = {
  students: [],
  total_pages: 0
};

type TPayload = {
  type: string;
  payload: {
    students: IStudent[];
    total_pages: number;
    error: string;
  }
}

const StudentsReducer: Reducer<TStudentsReducer, TPayload> = (state = initialState, {type, payload}): TStudentsReducer => {
  switch (type) {
    case 'STORE_STUDENT':
      return {
        students: payload.students,
        total_pages: payload.total_pages,
      };
    default:
      return state;
  }
};

export default StudentsReducer;
