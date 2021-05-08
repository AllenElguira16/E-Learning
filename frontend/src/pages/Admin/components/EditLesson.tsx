import React, { FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { editLesson } from '~store/actions/LessonAction';
import { TDispatch } from '~store';

type TProps = {
  lesson: {
    lesson_id: number;
    title: ILesson['title'];
    description: ILesson['description'];
    file: ILesson['file'];
  }
};

const EditLesson: FC<TProps> = ({ lesson }) => {

  const { subject_id } = useParams<{ subject_id: string }>();
 
   /**
    * For dispatching actions
    */
   const dispatch = useDispatch<TDispatch>();
  /**
   * Modal State
   */
   const [isOpen, setIsOpen] = useState<boolean>(false);
 
   /**
    * Toggle Modal
    */
   const toggle = (event: React.MouseEvent<HTMLButtonElement>) => {
     event.preventDefault();
     event.stopPropagation();
     setIsOpen(!isOpen);
   };

  const [inputState, setInputState] = useState<TLessonInput>({
    title: lesson.title,
    description: lesson.description,
    file: null
  });

  useEffect(() => {
    (async () => {
      const file = lesson.file;
      if (file !== null && file !== undefined) {
        const { data } = await axios.get(`http://localhost:3000/rest/static/${file}`, {
          responseType: 'blob'
        });

        setInputState((prevState) => ({
          ...prevState,
          file: new File([data], file, {
            type: data.type
          })
        }));
      }
    })();
  }, [lesson.file]);

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.currentTarget?.getAttribute('name') as keyof TLessonInput;
    const value = event.currentTarget?.value;

    setInputState({
      ...inputState,
      [key]: value
    });
  };

  const fileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.currentTarget?.getAttribute('name') as keyof TLessonInput;
    const value = event.currentTarget?.files?.[0];

    setInputState({
      ...inputState,
      [key]: value
    });
  };

  const uploadNewLesson = async (event: React.ChangeEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const formData = new FormData();
  
      formData.append('file', inputState.file as Blob);
      formData.append('title', inputState.title);
      formData.append('description', inputState.description);

      const response = await dispatch(editLesson(parseInt(subject_id), lesson.lesson_id, formData));

      alert(response.message);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Button onClick={toggle} color="warning">
        <FontAwesomeIcon icon="edit" fixedWidth />
      </Button>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Lesson</ModalHeader>
        <ModalBody>
          <Form autoComplete="off" onSubmit={uploadNewLesson}>
            <FormGroup>
              <Label for="title" hidden>Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                placeholder="Title"
                onChange={inputChange}
                value={inputState.title}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description" hidden>Description</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                placeholder="Description"
                style={{height: 250}}
                onChange={inputChange}
                value={inputState.description}
              />
            </FormGroup>
            <FormGroup>
              <Row className="justify-content-between" form>
                <Col>
                  <Label 
                    for={`file-${lesson.lesson_id}`} 
                    className={`btn btn-primary${!inputState.file ? ' text-primary bg-transparent' : ''}`}
                  >
                    <FontAwesomeIcon icon="file"/>
                    <span className="pl-2">Upload</span>
                  </Label>
                  <Input
                    type="file"
                    name="file"
                    id={`file-${lesson.lesson_id}`}
                    accept="application/pdf,application/msword,application/vnd.ms-powerpoint,video/*"
                    onChange={fileChange}
                    hidden
                  />
                </Col>
                <Col className="flex-grow-0">
                  <Button type="submit" className="bg-primary">Submit</Button>
                </Col>
              </Row>
            </FormGroup>
          </Form>    
        </ModalBody>
      </Modal>
    </>
  );
};

export default EditLesson;
