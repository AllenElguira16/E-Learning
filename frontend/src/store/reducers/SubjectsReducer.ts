import { Reducer } from 'redux';

const initialState: TSubjectReducer = {
  subjects: [],
  total_pages: 0
};

type TPayload = {
  type: string;
  payload: {
    subjects: ISubject[];
    total_pages: number;
  }
}

const SubjectReducer: Reducer<TSubjectReducer, TPayload> = (
  state = initialState,
  {type, payload}
): TSubjectReducer => {
  switch (type) {
    case 'STORE_SUBJECTS':
      console.log(payload);

      return {
        subjects: payload.subjects,
        total_pages: payload.total_pages,
      };
    default:
      return state;
  }
};

export default SubjectReducer;
