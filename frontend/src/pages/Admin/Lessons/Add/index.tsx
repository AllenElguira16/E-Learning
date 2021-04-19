import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import axios from 'axios';

const Add = () => {

  
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
    event.preventDefault();
    const formData = new FormData();

    formData.append('file', inputState.file as Blob);
    formData.append('title', inputState.title);
    formData.append('description', inputState.description);

    const { data } = await axios.post('/rest/lesson/upload', formData);
    alert(data.message);
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
                onChange={inputChange}
                value={inputState.description}
              />
            </FormGroup>
            <FormGroup>
              <Row className="justify-content-between" form>
                <Col>
                  <Label for="file" className="btn btn-primary text-primary bg-transparent">
                    <FontAwesomeIcon icon="file"/>
                    <span className="pl-2">Upload</span>
                  </Label>
                  <Input
                    type="file"
                    name="file"
                    id="file"
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
