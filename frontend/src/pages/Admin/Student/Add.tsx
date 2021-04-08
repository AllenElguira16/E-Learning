import React, { FC, useEffect, useState } from "react";
import { FormGroup, Label, Input, Form, Row, Col, Button, FormFeedback } from "reactstrap";
import { addStudent } from "../../../api";

const Add: FC = () => {
  /**
   * Input State
   */
  const [input, setInput] = useState<TInput>({
    first_name: '',
    middle_name: '',
    last_name: '',
  })

  /**
   * Input Error State
   */
  const [inputError, setInputError] = useState<TInput>({
    first_name: '',
    middle_name: '',
    last_name: ''
  })

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
  }

  /**
   * Submit event for adding new student
   * 
   * @param event 
   */
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await addStudent(input)

    if (response.status !== 200) {
      Object.keys(response.data).forEach((key) => {
        const message = response.data[key]?.message;
        
        setInputError(prevState => ({
          ...prevState,
          [key]: message
        }))
      })
      return
    }

    alert(response.message)
  }
  
  useEffect(() => {
    console.log(inputError)
  }, [inputError]);

  return (
    <Row>
      <Col md={6}>
        <Form autoComplete="off" onSubmit={onSubmit}>
          <FormGroup>
            <Label for="first_name">First Name</Label>
            <Input 
              type="text" 
              name="first_name" 
              id="first_name" 
              placeholder="Enter student's first name" 
              onChange={onChange} 
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
              invalid={inputError.last_name !== ''} 
            />
            <FormFeedback>{inputError.last_name}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Button type="submit">Add Student</Button>
          </FormGroup>
        </Form>
      </Col>
    </Row>
  )
}

export default Add;
