import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, CardHeader, Form, FormGroup, Input, Label } from 'reactstrap';
import { TDispatch } from '~store';
import { editStudentInfo } from '~store/actions/AuthAction';
// import { loginStudent } from '~store/actions/AuthAction';

type TUserInput = {
  first_name: string;
  middle_name: string;
  last_name: string;
  password: string | null;
}

const StudentInfo: FC = () => {
  const [onEdit, setOnEdit] = useState(false);
  const { auth } = useSelector<TRootReducers, TRootReducers>(state => state);

  const dispatch = useDispatch<TDispatch>();

  const [userInput, setUserInput] = useState<TUserInput>({
    first_name: auth.student?.first_name as string,
    middle_name: auth.student?.first_name as string,
    last_name: auth.student?.first_name as string,
    password: auth.student?.password as string || ''
  });

  const changeInputState = (key: keyof TUserInput) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({
      ...userInput,
      [key]: event.currentTarget.value
    });
  };

  const submitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await dispatch(editStudentInfo(userInput));
    alert(response);
  };

  return (
    <div className="d-flex" style={{height: '100vh'}}>
      <div className="col-6 mx-auto mt-5">
        <Card>
          <CardHeader>{auth.student?.first_name} {auth.student?.last_name}'s Info</CardHeader>
          <CardBody>
            <Form onSubmit={submitLogin}>
              <FormGroup>
                <Label>First Name</Label>
                <Input 
                  placeholder="First Name"
                  value={userInput.first_name}
                  onChange={changeInputState('first_name')}
                  readOnly={!onEdit}
                />
              </FormGroup>
              <FormGroup>
                <Label>Middle Name</Label>
                <Input 
                  placeholder="Middle Name"
                  value={userInput.middle_name}
                  onChange={changeInputState('middle_name')}
                  readOnly={!onEdit}
                />
              </FormGroup>
              <FormGroup>
                <Label>Last Name</Label>
                <Input
                  placeholder="Last Name"
                  value={userInput.last_name}
                  onChange={changeInputState('last_name')}
                  readOnly={!onEdit}
                />
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input 
                  type="password" 
                  placeholder="Password" 
                  value={userInput.password as string}
                  onChange={changeInputState('password')}
                  readOnly={!onEdit}
                />
              </FormGroup>
              {!onEdit && (
                <FormGroup>
                  <Button color="primary" type="button" onClick={() => setOnEdit(!onEdit)}>Edit</Button>
                </FormGroup>
              )}
              {onEdit && (
                <FormGroup>
                  <Button color="primary" type="submit">Submit</Button>
                </FormGroup>
              )}
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default StudentInfo;
