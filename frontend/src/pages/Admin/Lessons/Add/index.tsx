import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import { addLesson } from '../../../../store/actions/LessonAction';
import { useDispatch } from 'react-redux';

const Add = () => {
  /**
   * Route params
   */
   const page = parseInt((new URLSearchParams(useLocation().search)).get('page') as string);
 
   /**
    * For dispatching actions
    */
   const dispatch = useDispatch();
  /**
   * Modal State
   */
   const [isOpen, setIsOpen] = useState<boolean>(false);
 
   /**
    * Toggle Modal
    */
   const toggle = () => {
     setIsOpen(!isOpen);
   };

  const [inputState, setInputState] = useState<TLessonInput>({
    title: '',
    description: '',
    file: null
  });

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

      const [response, toDispatch] = await addLesson(formData, page);
      dispatch(toDispatch);
      alert(response.message);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Button onClick={toggle}>Add Lessons</Button>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Lesson</ModalHeader>
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
                    for="file" 
                    className={`btn btn-primary${!inputState.file ? ' text-primary bg-transparent' : ''}`}
                  >
                    <FontAwesomeIcon icon="file"/>
                    <span className="pl-2">Upload</span>
                  </Label>
                  <Input
                    type="file"
                    name="file"
                    id="file"
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

export default Add;
