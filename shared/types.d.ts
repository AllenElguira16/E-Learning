type THelloWorldToggle = boolean | null;

type TRootReducers = {
  helloWorld: THelloWorldToggle
};

interface IStudent {
  student_id: string,
  first_name: string,
  middle_name: string,
  last_name: string,
  profile_id: number | null,
  created: Date
}