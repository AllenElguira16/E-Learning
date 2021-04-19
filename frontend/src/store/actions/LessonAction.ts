import axios, { AxiosResponse } from 'axios';

type TDispatch = {
  type: string;
  payload: any;
}

export const getLessons = async (page: number): Promise<TDispatch | void> => {
  type TResponse = AxiosResponse<IResponse<TLessonReducer>>
  const limit = 5;
  const { data: { details } }: TResponse = await axios.get(`/rest/lesson/list?page=${page}&limit=${limit}`);

  if (details) {
    // const { data } = await axios.get(`/rest/${details.lessons[0].file}`, {
    //   responseType: 'arraybuffer'
    // });
    // console.log(data);
    // if (page > details.total_pages) {
    //   throw new Error(`Page must be lesser than ${page}`);
    // }

    return {
      type: 'STORE_LESSONS',
      payload: {
        lessons: details.lessons,
        total_pages: details.total_pages,
      }
    };
  }
};
