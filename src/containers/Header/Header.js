import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import './Header.css';

class Header extends Component {
  initGameHandler = () => {

  };
  resetGameHandler = () => {

  };
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
            <Button onClick={this.initGameHandler} className="myBtn" color="secondary">New
              Game</Button>
            <Button onClick={this.resetGameHandler} className="myBtn" type="button" color="secondary">Reset</Button>
          </Form>
        </div>
    );
  }
}

export default Header;