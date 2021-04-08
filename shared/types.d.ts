type THelloWorldToggle = boolean | null;

type TRootReducers = {
  helloWorld: THelloWorldToggle;
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
  data?: T;
}

type TInput = Pick<IStudent, "first_name"|"middle_name"|"last_name"> 

type TValidationObject<T = keyof T> = {
  hasErrors: boolean;
  data: {
    [key in keyof T]: {
      message?: string
    }
  }
}
