import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { VideoPlayer } from '~components';

const PreviewLesson = () => {

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

  const fileFromUrl = (filepath: string) => {
    const arr = window.location.href.split('/');
    const url = arr[0] + '//' + arr[2];
    
    return `${url}/statics/${filepath}`;
  };

  return (
    <>
      {lesson && (
        <>
          <header className="d-flex justify-content-between">
            <span>
              <h1>{lesson.title}</h1>
              <p>{lesson.description}</p>
            </span>
            <span>
              <a href={`/statics/${lesson.file}`} download>
                <FontAwesomeIcon icon="file"/>
                <span className="pl-2">Download File</span>
              </a>
            </span>
          </header>
          <main>
            {lesson.type === 'video' && (
              <VideoPlayer url={`/statics/${lesson.file}`}/>
            )}
            {
              (lesson.type === 'document' && lesson.file) && (
                <iframe 
                  title="sad" 
                  src={`https://docs.google.com/gview?url=${fileFromUrl(lesson.file)}&embedded=true`}
                />
              )
            }
          </main>
        </>
      )}
    </>
  );
};

export default PreviewLesson;
