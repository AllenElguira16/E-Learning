import { Reducer } from 'redux';

const initialState: TLessonReducer = {
  lessons: [],
  total_pages: 0
};

type TPayload = {
  type: string;
  payload: {
    lessons: ILesson[];
    total_pages: number;
  }
}

const LessonReducer: Reducer<TLessonReducer, TPayload> = (
  state = initialState,
  {type, payload}
): TLessonReducer => {
  switch (type) {
    case 'STORE_STUDENT':
      return {
        lessons: payload.lessons,
        total_pages: payload.total_pages,
      };
    default:
      return state;
  }
};

export default LessonReducer;
