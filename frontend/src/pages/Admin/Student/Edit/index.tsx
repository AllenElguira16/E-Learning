import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, useState } from 'react';
import { FormGroup, Label, Input, Form, Button, FormFeedback, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { editStudent } from '../../../../store/actions/StudentAction';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

type TProps = {
  student: IStudent
}

/**
 * A Component for editing student
 *
 * @returns FC
 */
const Edit: FC<TProps> = ({student}) => {
  /**
   * Modal State
   */
  const [isOpen, setIsOpen] = useState<boolean>(false);

  /**
   * Route params
   */
  const { page } = useParams<{ page: string; }>();

  /**
   * For dispatching actions
   */
  const dispatch = useDispatch();

  /**
   * Toggle Modal
   */
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  /**
   * Input State
   */
  const [input, setInput] = useState<TInput>({
    first_name: student.first_name || '',
    middle_name: student.middle_name || '',
    last_name: student.last_name || '',
  });

  /**
   * Input Error State
   */
  const [inputError, setInputError] = useState<TInput>({
    first_name: '',
    middle_name: '',
    last_name: ''
  });

  /**
   * Handles input change
   *
   * @param event
   */
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };

  /**
   * Submit event for adding new student
   *
   * @param event
   */
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      const [response, toDispatch] = await editStudent(student.student_id, input, parseInt(page));

      alert(response.message);
      dispatch(toDispatch);

      setInputError({first_name: '', middle_name: '' ,last_name: ''});
    } catch (error) {
      error.response.data.errors.forEach(({instancePath, message}: any) => {

        setInputError(prevState => ({
          ...prevState,
          [instancePath.substring(1)]: message
        }));
      });
    }
  };

  return (
    <>
      <Button color="warning" onClick={toggle}>
        <FontAwesomeIcon icon="edit" fixedWidth />
      </Button>
      <Modal isOpen={isOpen} toggle={toggle}>
        <Form autoComplete="off" onSubmit={onSubmit}>
          <ModalHeader toggle={toggle}>Edit Student</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="first_name">First Name</Label>
              <Input
                type="text"
                name="first_name"
                id="first_name"
                placeholder="Enter student's first name"
                onChange={onChange}
                value={input.first_name}
                invalid={inputError.first_name !== ''}
              />
              <FormFeedback>{inputError.first_name}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="middle_name">Middle Name</Label>
              <Input
                type="text"
                name="middle_name"
                id="middle_name"
                placeholder="Enter student's middle name"
                onChange={onChange}
                value={input.middle_name}
                invalid={inputError.middle_name !== ''}
              />
              <FormFeedback>{inputError.middle_name}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="last_name">First Name</Label>
              <Input
                type="text"
                name="last_name"
                id="last_name"
                placeholder="Enter student's last name"
                onChange={onChange}
                value={input.last_name}
                invalid={inputError.last_name !== ''}
              />
              <FormFeedback>{inputError.last_name}</FormFeedback>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button type="submit">Edit Student</Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};

export default Edit;
