import React, { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { useDispatch } from 'react-redux';

import { editSubject } from '~store/actions/SubjectsAction';
import { TDispatch } from '~store';

type TProps = {
  subject: {
    subject_id: number;
    title: ISubject['title'];
    description: ILesson['description'];
  }
};

const EditSubject: FC<TProps> = ({ subject }) => {

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

  const [inputState, setInputState] = useState<TSubjectInput>({
    title: subject.title,
    description: subject.description,
  });

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.currentTarget?.getAttribute('name') as keyof TLessonInput;
    const value = event.currentTarget?.value;

    setInputState({
      ...inputState,
      [key]: value
    });
  };

  const submit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
  
      const response = await dispatch(editSubject(subject.subject_id, inputState));

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
        <ModalHeader toggle={toggle}>Edit Subject</ModalHeader>
        <ModalBody>
          <Form autoComplete="off" onSubmit={submit}>
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

export default EditSubject;
