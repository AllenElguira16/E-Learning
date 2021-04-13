import { Reducer } from 'redux';

const initialState: TStudentReducer = {
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

const StudentReducer: Reducer<TStudentReducer, TPayload> = (state = initialState, {type, payload}): TStudentReducer => {
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

export default StudentReducer;
