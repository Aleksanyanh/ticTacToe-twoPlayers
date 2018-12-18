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
    ticTacBoard: [],
    firstPlayer: 'X',
    secondPlayer: '0',
    nextPlayer: '',
    emptyField: '',
    fieldLimit: 9,
    winner: '',
    startGame: false
  };

  componentWillMount() {
    const initTicTacBoard = [];

    for (let i = 0; i < this.state.fieldLimit; i++) {
      initTicTacBoard.push(this.state.emptyField);
    }
    this.setState({
      ticTacBoard: initTicTacBoard,
      nextPlayer: 'X',
      startGame: true
    })
  }

  updateTicTacBoard = (player, playerIndex) => {
    const board = [...this.state.ticTacBoard];
    const updatedBoard = board.map((field, index) => {
      if (index === playerIndex) {
        return field = player;
      } else {
        return field;
      }
    });
    return updatedBoard;
  };

  checkWinner = (player, updatedBoard) => {
    let winner = '';
    const winnerModel = [
      [0, 1, 2],
      [0, 4, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [3, 4, 5],
      [6, 7, 8]
    ];
    let filteredPlayersIndexArray = [];
    updatedBoard.forEach((field, index) => {
      if (field === player) {
        filteredPlayersIndexArray.push(index);
      }
    });

    function calculateForLength3(filteredPlayersLength3) {
      for (let i = 0; i < winnerModel.length; i++) {
        let counter = 0;
        for (let j = 0; j < 3; j++) {
          if (winnerModel[i][j] === filteredPlayersLength3[j]) {
            counter++;
            if (counter > 2) {
              winner = player;
              i = winnerModel.length;
              break;
            }
          }
        }
      }
    }

    if (filteredPlayersIndexArray.length === 3) {
      calculateForLength3(filteredPlayersIndexArray);
    } else if (filteredPlayersIndexArray.length === 4) {
      for (let i = 0; i < filteredPlayersIndexArray.length; i++) {
        let spliceArr = [...filteredPlayersIndexArray];
        spliceArr.splice(i, 1);
        calculateForLength3(spliceArr);
      }
    } else if (filteredPlayersIndexArray.length === 5) {
      for (let i = 0; i < filteredPlayersIndexArray.length; i++) {
        let spliceArr = [...filteredPlayersIndexArray];
        spliceArr.splice(i, 1);
        calculateForLength3(spliceArr);
      }
    }
    return winner;
  };

  callWinner = (player, updatedBoard, winnerName) => {
    const winner = this.checkWinner(player, updatedBoard);
    if (winner) {
      this.setState({
        ticTacBoard: updatedBoard,
        winner: winnerName,
        startGame: false
      });
    }
  };

  playerClickHandler = (e, index) => {
    if (!this.state.startGame) return;
    const firstPlayer = this.state.firstPlayer;
    const secondPlayer = this.state.secondPlayer;
    const nextPlayer = this.state.nextPlayer;
    const target = e.target.textContent;

    if (target === '' && nextPlayer === firstPlayer) {
      const updatedBoard = this.updateTicTacBoard(firstPlayer, index);
      this.setState({
        ticTacBoard: updatedBoard,
        nextPlayer: secondPlayer,
        startGame: true
      });
      this.callWinner(firstPlayer, updatedBoard, 'First Player');

    }

    if (target === '' && nextPlayer === secondPlayer) {
      const updatedBoard = this.updateTicTacBoard(secondPlayer, index);
      this.setState({
        ticTacBoard: updatedBoard,
        nextPlayer: firstPlayer,
        startGame: true
      });
      this.callWinner(secondPlayer, updatedBoard, 'Second Player');
    }
  };

  render() {
    let finishGame = null;
    if (!this.state.startGame) {
      finishGame = <p><strong>VICTORY:</strong> The game won the <strong>{this.state.winner}</strong> player</p>;
    }
    const ticTacListItem = this.state.ticTacBoard.map((field, index) => {
      return (
          <TicTacListItem playerClick={(e) => this.playerClickHandler(e, index)} key={index}>
            {field}
          </TicTacListItem>
      );
    });
    return (
        <div style={{ display: 'inline-block' }}>
          {finishGame}
          <BlockCSS>
            {ticTacListItem}
          </BlockCSS>
        </div>
    );
  }
}

export default TicTacToeList;