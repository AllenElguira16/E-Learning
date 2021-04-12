import React, { FC } from 'react';
import { Nav, NavItem } from 'reactstrap';
import Add from './Add';
import Lists from './Lists';

const Student: FC = () => {
  return (
    <>
      <Nav pills>
        <NavItem>
          <Add />
        </NavItem>
      </Nav>
      <Lists />
    </>
  )
}

export default Student;
