import React, { Component } from 'react';
import styled from 'styled-components';

import TicTacToeList from '../../components/TicTacList/TicTacList';

const TicTacToCSS = styled.div`
  display: inline-block;
`;

class TicTacToe extends Component {
  state = {
    fieldsCount: 9,
    currentPlayer: null,
    activePlayerIndex: null,
    playingCount: [],
    startGame: true,
  };

  addPlayingCount = (index) => {
    const playingCount = [...this.state.playingCount];
    playingCount.push(index);
    return playingCount;
  };

  clickTargetHandler = (e, index) => {
    const playingCount = this.addPlayingCount(index);

    if (e.target.innerText === '' && !this.state.playingCount.length) {
      this.setState({
        currentPlayer: 0,
        activePlayerIndex: index,
        playingCount: playingCount
      })
    } else if (e.target.innerText === '' && this.state.currentPlayer === 0) {
      this.setState({
        playingCount: playingCount,
        activePlayerIndex: index,
        currentPlayer: 1
      })
    } else if (e.target.innerText === '' && this.state.currentPlayer === 1) {
      this.setState({
        playingCount: playingCount,
        activePlayerIndex: index,
        currentPlayer: 0
      })
    }

    if (this.state.playingCount.length === this.state.fieldsCount) {
      this.setState({
        startGame: false
      })
    }

  };

  render() {
    return (
        <TicTacToCSS>
          <TicTacToeList
              fieldsCount={this.state.fieldsCount}
              clicked={(e, i) => this.clickTargetHandler(e, i)}
              playingCount={this.state.playingCount}
              currentPlayer={this.state.currentPlayer}
              activePlayerIndex={this.state.activePlayerIndex}
              startGame={this.state.startGame} />
        </TicTacToCSS>
    );
  }
}

export default TicTacToe;