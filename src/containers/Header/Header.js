import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import './Header.css';

class Header extends Component {

  render() {
    return (
        <div className="formContainer">
          <Form className="myForm">
            <FormGroup className="box">
              <Label for="firstName">First Player</Label>
              <Input type="text" id="firstName" placeholder="Enter Your Name" />
            </FormGroup>
            <FormGroup className="box">
              <Label for="secondName">Second Player</Label>
              <Input type="text" id="secondName" placeholder="Enter Your Name" />
            </FormGroup>
            <Button className="myBtn" type="button" color="success">Start New
              Game</Button>
            <Button className="myBtn" type="button" color="danger">Reset Game</Button>
          </Form>
        </div>
    );
  }
}

export default Header;