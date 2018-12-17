import React, { Component } from 'react';
import styled from 'styled-components';

import TicTacListItem from '../../components/TicTacListItem/TicTacListItem';

const BlockCSS = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 306px;
  box-shadow: 0 0 8px #661156;
  padding: 10px;
  z-index: 100;
`;

class TicTacToeList extends Component {
  state = {
    totalBox: 9,
    players: ['X', '0'],
    activePlayer: '',
    activePlayerIndex: '',
    nextPlayer: '',
    startGame: true
  };

  clickTargetHandler = (e) => {

    if (e.target.innerText === '' && this.state.startGame) {
      this.setState({
        activePlayer: 0,
      })
    } else if (e.target.innerText === '' && this.state.activePlayer === 0) {
      this.setState({
        activePlayer: 1,
        startGame: false
      })
    } else if (e.target.innerText === '' && this.state.activePlayer === 1) {
      this.setState({
        activePlayer: 0,
        startGame: false
      })
    }

  };


  render() {
    let ticTacListItem = [];
    for (let i = 0; i < this.state.totalBox; i++) {
      ticTacListItem.push(
          <TicTacListItem
              key={i}
              clicked={this.state.clickTargetHandler}>
            {this.state.activePlayer}
          </TicTacListItem>
      );
    }
    return (
        <BlockCSS>
          {ticTacListItem}
        </BlockCSS>
    );
  }
}

export default TicTacToeList;