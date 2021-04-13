type THelloWorldToggle = boolean | null;

type TRootReducers = {
  helloWorld: THelloWorldToggle;
  student: TStudentReducer;
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

type TValidationObject<T> = {
  hasErrors: boolean;
  data: {
    [key in keyof T]: {
      message?: string
    }
  }
}

type TStudentReducer = {
  students: IStudent[];
  total_pages: number;
}
