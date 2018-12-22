import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import './Header.css';
import { mapDispatchToProps } from './redux-selectors/mapDispatchToProps';
import { mapStateToProps } from './redux-selectors/mapStateToProps';
import Aux from '../../hoc/Aux';

class Header extends Component {

  render() {
    let startGame = (
        <Aux>
          <FormGroup className="box">
            <Label for="firstName">First Player (X)</Label>
            <Input onChange={this.props.inputFirstPlayerName} value={this.props.firstPlayerName} type="text"
                   id="firstName" placeholder="Enter Your Name" />
          </FormGroup>
          <FormGroup className="box">
            <Label for="secondName">Second Player (0)</Label>
            <Input onChange={this.props.inputSecondPlayerName} value={this.props.secondPlayerName} type="text"
                   id="secondName" placeholder="Enter Your Name" />
          </FormGroup>
          <Button onClick={this.props.savePlayers} className="myBtn" color="secondary">Save</Button>
        </Aux>
    );

    if (this.props.savedPlayer) {
      startGame = (
          <Aux>
            <Button onClick={this.props.initGame} className="myBtn" color="secondary">New Game</Button>
            <Button onClick={this.props.resetGame} className="myBtn" type="button" color="secondary">Reset</Button>
          </Aux>
      );
    }

    return (
        <div className="formContainer">
          <Form className="myForm">
            {startGame}
          </Form>
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);