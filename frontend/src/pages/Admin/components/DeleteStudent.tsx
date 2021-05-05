import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, useState } from 'react';
import { Form, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { deleteStudent } from '~store/actions/StudentAction';

type TProps = {
  student: IStudent
}

/**
 * A Component for editing student
 *
 * @returns FC
 */
const DeleteStudent: FC<TProps> = ({student}) => {
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

  /**
   * Route params
   */
   const page = parseInt((new URLSearchParams(useLocation().search)).get('page') as string);
  /**
   * For dispatching actions
   */
  const dispatch = useDispatch();

  /**
   * Submit event for adding new student
   *
   * @param event
   */
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const [response, toDispatch] = await deleteStudent(student.student_id, page);

    alert(response.message);
    dispatch(toDispatch);
  };

  return (
    <>
      <Button color="danger" onClick={toggle}>
        <FontAwesomeIcon icon="trash" fixedWidth />
      </Button>
      <Modal isOpen={isOpen} toggle={toggle}>
        <Form autoComplete="off" onSubmit={onSubmit}>
          <ModalHeader toggle={toggle}>Warning!</ModalHeader>
          <ModalBody>
            Are you sure to delete student?
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary">Yes</Button>
            <Button onClick={toggle}>No</Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};

export default DeleteStudent;
