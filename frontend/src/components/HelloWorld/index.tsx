import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';

const HelloWorld: FC = () => {
  const { helloWorld } = useSelector<TRootReducers, TRootReducers>(state => state);
  const dispatch = useDispatch();
  
  const toggleHelloWorld = () => {
    dispatch({type: 'TOGGLE_HELLO_WORLD'});
  };

  return (
    <>
      <div>
        <Button color="primary" onClick={toggleHelloWorld}>Toggle</Button>
      </div>
      <div>
        {helloWorld && 'Hello World'}
      </div>
    </>
  );
};

export default HelloWorld;
