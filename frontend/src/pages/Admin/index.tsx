import React from "react";
import { Route } from "react-router-dom";
import { Container } from "reactstrap";
import Navigation from "./Navigation";
import StudentList from "./Student/Lists";

const Admin = () => {
  return (
    <>
      <Navigation/>
      <Container>
        <Route path="/admin/lesson/list" component={StudentList} />
        <Route path="/admin/lesson/upload" component={() => <>GG</>} />
      </Container>
    </>
  );
};

export default Admin;
