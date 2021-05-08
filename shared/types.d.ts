type TRootReducers = {
  student: TStudentReducer;
  subject: TSubjectReducer;
  lesson: TLessonReducer;
  page: TPageReducer;
};

interface IStudent {
  student_id: number | string;
  first_name: string;
  middle_name: string;
  last_name: string;
  profile_id: number | null;
  created: Date;
}

interface IResponse<T = any> {
  status: number;
  message: string;
  details?: T;
}

type TInput = Pick<IStudent, "first_name"|"middle_name"|"last_name">

type TStudentReducer = {
  students: IStudent[];
  total_pages: number;
}

interface ISubject {
  subject_id: number;
  title: string;
  description: string;
  lessons?: ILesson[];
  created: Date;
}

type TSubjectInput = {
  title: string;
  description: string;
}

type TSubjectReducer = {
  subjects: ISubject[];
  total_pages: number;
}

interface ILesson {
  lesson_id: number;
  subject_id: ISubject;
  title: string;
  description: string;
  file?: string;
  type?: string;
  created: Date;
}

type TLessonInput = {
  title: string;
  description: string;
  file: File | null;
}

type TLessonReducer = {
  total_pages: number;
  lessons: ILesson[];
}

type TPageReducer = {
  current_page: number;
  search_input: string;
}
