import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, useState } from 'react';
import { Form, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { deleteSubject } from '~store/actions/SubjectsAction';

type TProps = {
  subject_id: ISubject['subject_id']
}

/**
 * A Component for editing student
 *
 * @returns FC
 */
const DeleteLesson: FC<TProps> = ({ subject_id }) => {
  
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

    const [response, toDispatch] = await deleteSubject(subject_id, page);

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
            Are you sure to delete this subject?
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

export default DeleteLesson;
