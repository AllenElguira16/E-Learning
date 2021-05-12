import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Card, CardBody, CardHeader, Form, FormGroup, Input } from 'reactstrap';
import { TDispatch } from '~store';
import { loginStudent } from '~store/actions/AuthAction';

type TUserInput = {
  school_id: string;
  password: string;
}

const Login: FC = () => {

  const dispatch = useDispatch<TDispatch>();

  const [userInput, setUserInput] = useState<TUserInput>({
    school_id: '',
    password: ''
  });

  const changeInputState = (key: keyof TUserInput) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({
      ...userInput,
      [key]: event.currentTarget.value
    });
  };

  const submitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await dispatch(loginStudent(userInput.school_id, userInput.password));
    alert(response);
  };

  return (
    <div className="d-flex" style={{height: '100vh'}}>
      <div className="col-6 mx-auto mt-5">
        <Card>
          <CardHeader>Login</CardHeader>
          <CardBody>
            <Form onSubmit={submitLogin}>
              <FormGroup>
                <Input 
                  placeholder="Student-ID"
                  value={userInput.school_id}
                  onChange={changeInputState('school_id')}
                />
              </FormGroup>
              <FormGroup>
                <Input 
                  type="password" 
                  placeholder="Password" 
                  value={userInput.password}
                  onChange={changeInputState('password')}
                />
              </FormGroup>
              <FormGroup>
                <Button color="primary">Login</Button>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Login;
