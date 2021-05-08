import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, useState } from 'react';
import { Form, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { deleteLesson } from '~store/actions/LessonAction';
import { TDispatch } from '~store';

type TProps = {
  lesson_id: ILesson['lesson_id']
}

/**
 * A Component for editing student
 *
 * @returns FC
 */
const DeleteLesson: FC<TProps> = ({lesson_id}) => {
  
  const { subject_id } = useParams<{ subject_id: string }>();
  
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
   * For dispatching actions
   */
  const dispatch = useDispatch<TDispatch>();

  /**
   * Submit event for adding new student
   *
   * @param event
   */
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await dispatch(deleteLesson(parseInt(subject_id), lesson_id));

    alert(response);
    // dispatch(toDispatch);
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
            Are you sure to delete this lesson?
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
