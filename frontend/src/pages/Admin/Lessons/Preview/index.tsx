import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';

import { VideoPlayer } from '../../../../components/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Preview = () => {
  const { lesson_id } = useParams<{ lesson_id: string;}>();

  const [lesson, setLesson] = useState<ILesson|null>(null);


  useEffect(() => {
    (async () => {
      const { data: { details } }: AxiosResponse<IResponse<{ lesson: ILesson; }>> = await axios.get(`/rest/lesson/${parseInt(lesson_id)}`);

      if (details) {
        setLesson({
          ...details.lesson
        });
      }
    })();
  }, [lesson_id]);

  return (
    <>
      {lesson && (
        <>
          <h1>{lesson.title}</h1>
          <p>{lesson.description}</p>
          {lesson.type === 'video' && (
            <VideoPlayer url={`/rest/static/${lesson.file}`}/>
          )}
          {
            (lesson.type === 'document') && (
              <a href={`/rest/static/${lesson.file}`} download>
                <FontAwesomeIcon icon="file"/>
                <span>{lesson.file}</span>
              </a>
            )
          }
        </>
      )}
    </>
  );
};

export default Preview;
