import React, { Component } from 'react';
import styled from 'styled-components';

import TicTacToeList from '../../components/TicTacList/TicTacList';

const TicTacToCSS = styled.div`
  display: inline-block;
`;

class TicTacToe extends Component {
  state = {
    fieldsCount: 9,
    nextPlayer: null,
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
        nextPlayer: 0,
        activePlayerIndex: index,
        playingCount: playingCount
      })
    } else if (e.target.innerText === '' && this.state.nextPlayer === 0) {
      this.setState({
        playingCount: playingCount,
        activePlayerIndex: index,
        nextPlayer: 1
      })
    } else if (e.target.innerText === '' && this.state.nextPlayer === 1) {
      this.setState({
        playingCount: playingCount,
        activePlayerIndex: index,
        nextPlayer: 0
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
              nextPlayer={this.state.nextPlayer}
              activePlayerIndex={this.state.activePlayerIndex}
              startGame={this.state.startGame} />
        </TicTacToCSS>
    );
  }
}

export default TicTacToe;