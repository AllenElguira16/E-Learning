import axios, { AxiosResponse } from 'axios';

type TDispatch = {
  type: string;
  payload: any;
}

export const getSubjects = async (page: number): Promise<TDispatch | void> => {
  type TResponse = AxiosResponse<IResponse<TSubjectReducer>>
  const limit = 5;
  const { data: { details } }: TResponse = await axios.get(`/rest/subjects?page=${page}&limit=${limit}`);

  
  if (details) {
    if (page > details.total_pages && details.total_pages > 0) {
      throw new Error(`Page must be lesser than ${page}`);
    }

    return {
      type: 'STORE_SUBJECTS',
      payload: {
        subjects: details.subjects,
        total_pages: details.total_pages,
      }
    };
  }
};


export const addSubject = async (input: TSubjectInput, page: number): Promise<[IResponse, TDispatch | void]> => {
  const { data: axiosData } = await axios.post('/rest/subjects', input);

  return [axiosData, await getSubjects(page)];
};

export const editSuject = async (subject_id: number, input: TSubjectInput, page: number): Promise<[IResponse, TDispatch | void]> => {
  const { data: axiosData } = await axios.put(`/rest/subjects/${subject_id}`, input);

  return [axiosData, await getSubjects(page)];
};

// export const deleteLesson = async (lesson_id: ILesson['lesson_id'], page: number): Promise<[IResponse, TDispatch | void]> => {
//   const { data: axiosData }: AxiosResponse<IResponse> = await axios.delete(`/rest/lesson/delete/${lesson_id}`);

//   return [axiosData, await getLessons(page)];
// };
