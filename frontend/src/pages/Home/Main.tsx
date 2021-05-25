import React, { FC } from 'react';

const Main: FC = () => {
  return (
    <>
      <div className="jumbotron bg-secondary">
        <h1 className="display-4">E-Learning Web!</h1>
        <p className="lead">Welcome where students learn trough technology</p>
        <p>If you want to study with us, just contact us</p>
        <p>Phone: 09xx-xxx-xxxx</p>
        <p>E-Mail: sample_email@gmail.com</p>
        <hr className="my-4"/>
        <p>Student already? then login now!</p>
        <a className="btn btn-primary btn-lg" href="/login" role="button">Login</a>
      </div>
    </>
  );
};

export default Main;
