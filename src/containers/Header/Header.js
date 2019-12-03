import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import './Header.css';
import { mapDispatchToProps } from './redux-selectors/mapDispatchToProps';
import { mapStateToProps } from './redux-selectors/mapStateToProps';

class Header extends Component {

  render() {
    let startGame = (
        <>
          <FormGroup className="box">
            <Label for="firstName"><strong>First Player (X)</strong></Label>
            <Input onChange={this.props.inputFirstPlayerName} value={this.props.firstPlayerName} type="text"
                   id="firstName" placeholder="Enter Your Name" />
          </FormGroup>
          <FormGroup className="box">
            <Label for="secondName"><strong>Second Player (0)</strong></Label>
            <Input onChange={this.props.inputSecondPlayerName} value={this.props.secondPlayerName} type="text"
                   id="secondName" placeholder="Enter Your Name" />
          </FormGroup>
          <Button onClick={this.props.savePlayers} className="myBtn" color="secondary">START</Button>
        </>
    );

    if (this.props.savedPlayer) {
      startGame = (
          <>
            <Button onClick={this.props.initGame} className="myBtn" color="secondary">NEW GAME</Button>
            <Button onClick={this.props.resetGame} className="myBtn" type="button" color="secondary">RESET</Button>
          </>
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