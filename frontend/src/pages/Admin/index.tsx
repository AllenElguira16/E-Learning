import React from "react";
import { Route } from "react-router-dom";
import { Container } from "reactstrap";
import Navigation from "./Navigation";
import StudentList from "./Student/Lists";
import AddStudent from "./Student/Add";

const Admin = () => {
  return (
    <>
      <Navigation/>
      <Container>
        <Route path="/admin/student/list" component={StudentList} />
        <Route path="/admin/student/add" component={AddStudent} />
      </Container>
    </>
  );
};

export default Admin;
