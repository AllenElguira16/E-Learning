import React, { useState } from 'react';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { useDispatch } from 'react-redux';

import { addSubject } from '~store/actions/SubjectsAction';
import { TDispatch } from '~store';

const AddSubject = () => {
 
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
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const [inputState, setInputState] = useState<TSubjectInput>({
    title: '',
    description: ''
  });

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.currentTarget?.getAttribute('name') as keyof TLessonInput;
    const value = event.currentTarget?.value;

    setInputState({
      ...inputState,
      [key]: value
    });
  };

  const submitSubject = async (event: React.ChangeEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      const response = await dispatch(addSubject(inputState));
      // dispatch(toDispatch);s
      alert(response.message);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Button onClick={toggle}>Add Subject</Button>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Subject</ModalHeader>
        <ModalBody>

          <Form autoComplete="off" onSubmit={submitSubject}>
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
              <Button type="submit" className="bg-primary">Submit</Button>
            </FormGroup>
          </Form>    
        </ModalBody>
      </Modal>
    </>
  );
};

export default AddSubject;
