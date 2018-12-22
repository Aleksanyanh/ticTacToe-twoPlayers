import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import './Header.css';
import { mapDispatchToProps } from './redux-selectors/mapDispatchToProps';
import { mapStateToProps } from './redux-selectors/mapStateToProps';
import Aux from '../../hoc/Aux';

class Header extends Component {

  render() {
    return (
        <div className="formContainer">
          <Form className="myForm">
            <FormGroup className="box">
              <Label for="firstName">First Player</Label>
              <Input onChange={this.props.inputFirstPlayerName} value={this.props.firstPlayerName} type="text"
                     id="firstName" placeholder="Enter Your Name" />
            </FormGroup>
            <FormGroup className="box">
              <Label for="secondName">Second Player</Label>
              <Input onChange={this.props.inputSecondPlayerName} value={this.props.secondPlayerName} type="text"
                     id="secondName" placeholder="Enter Your Name" />
            </FormGroup>
            <Button onClick={this.props.savePlayers} className="myBtn" color="secondary">Save</Button>
            {
              this.props.savedPlayer ? (
                  <Aux>
                    <Button onClick={this.props.initGame} className="myBtn" color="secondary">New Game</Button>
                    <Button onClick={this.props.resetGame} className="myBtn" type="button" color="secondary">Reset</Button>
                  </Aux>
              ) : null
            }

          </Form>
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);