import React, { FC, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { VideoPlayer } from '~components';

const PreviewLesson: FC = () => {

  const { lesson_id, subject_id } = useParams<{ lesson_id: string, subject_id: string ;}>();

  const [lesson, setLesson] = useState<ILesson|null>(null);


  useEffect(() => {
    (async () => {
      const { data: { details } }: AxiosResponse<IResponse<{ lesson: ILesson; }>> = await axios.get(`/rest/subjects/${subject_id}/lessons/${parseInt(lesson_id)}`);

      if (details) {
        setLesson({
          ...details.lesson
        });
      }
    })();
  }, [lesson_id, subject_id]);

  return (
    <>
      {lesson && (
        <>
          <h1>{lesson.title}</h1>
          <p>{lesson.description}</p>
          {lesson.type === 'video' && (
            <VideoPlayer url={`/statics/${lesson.file}`}/>
          )}
          {
            (lesson.type === 'document') && (
              <a href={`/statics/${lesson.file}`} download>
                <FontAwesomeIcon icon="file"/>
                <span className="pl-2">Download File</span>
              </a>
            )
          }
        </>
      )}
    </>
  );
};

export default PreviewLesson;
