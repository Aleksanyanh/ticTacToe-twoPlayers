import React, { Component } from 'react';
import styled from 'styled-components';
import { Alert } from 'reactstrap';

import TicTacListItem from '../../components/TicTacListItem/TicTacListItem';
import FirstPlayer from '../../components/First-player/First-player';
import SecondPlayer from '../../components/Second-player/Second-player';
import Aux from '../../hoc/Aux';

const BlockCSS = styled.div`
  display: flex;
  background: teal;
  margin-top: 25px;
  flex-wrap: wrap;
  width: 620px;
  box-shadow: 0 0 8px #661156;
  padding: 10px;
`;

const ContentCSS = styled.div`
  width: 100%;
  display: flex;
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
    warningMessage: false,
    startGame: false,
  };

  componentWillMount() {
    console.log('componentWill');
    const initTicTacBoard = [];
    for (let i = 0; i < this.state.fieldLimit; i++) {
      initTicTacBoard.push({ field: this.state.emptyField, drawField: '' });
    }
    this.setState({
      ticTacBoard: initTicTacBoard,
      nextPlayer: 'X',
      startGame: true
    })
  }

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
        warningMessage: false
      });
      this.callWinner(firstPlayer, updatedBoard, 'First Player');
    }

    if (target === '' && nextPlayer === secondPlayer) {
      const updatedBoard = this.updateTicTacBoard(secondPlayer, index);
      this.setState({
        ticTacBoard: updatedBoard,
        nextPlayer: firstPlayer,
        warningMessage: false,
      });
      this.callWinner(secondPlayer, updatedBoard, 'Second Player');
    }

    if (target !== '') {
      this.setState({ warningMessage: true });
    }
  };

  updateTicTacBoard = (player, playerIndex) => {
    const board = [...this.state.ticTacBoard];
    return board.map((playerField, index) => {
      if (index === playerIndex) {
        playerField.field = player;
        return playerField;
      } else {
        return playerField;
      }
    });
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
    const filteredPlayersIndex = [];
    updatedBoard.forEach((playerField, index) => {
      if (playerField.field === player) {
        filteredPlayersIndex.push(index);
      }
    });

    function calculateForLength3(filteredPlayersLength3) {
      for (let i = 0; i < winnerModel.length; i++) {
        let counter = 0;
        let drawWinnerLocalBox = [];
        for (let j = 0; j < 3; j++) {
          if (winnerModel[i][j] === filteredPlayersLength3[j]) {
            counter++;
            drawWinnerLocalBox.push(winnerModel[i][j]);
            if (counter > 2) {
              drawWinnerLocalBox.map((elIndex) => {
                return updatedBoard[elIndex].drawField = elIndex.toString();
              });
              winner = player;
              i = winnerModel.length;
              break;
            }
          }
        }
      }
    }

    function calculateForLength4(filteredPlayersIndex) {
      for (let i = 0; i < filteredPlayersIndex.length; i++) {
        let spliceArr = [...filteredPlayersIndex];
        spliceArr.splice(i, 1);
        calculateForLength3(spliceArr);
      }
    }

    function calculateForLength5(filteredPlayersIndex) {
      for (let i = 0; i < filteredPlayersIndex.length; i++) {
        let spliceArr = [...filteredPlayersIndex];
        spliceArr.splice(i, 1);
        calculateForLength4(spliceArr);
      }
    }

    if (filteredPlayersIndex.length === 3) {
      calculateForLength3(filteredPlayersIndex);
    } else if (filteredPlayersIndex.length === 4) {
      calculateForLength4(filteredPlayersIndex);
    } else if (filteredPlayersIndex.length === 5) {
      calculateForLength5(filteredPlayersIndex);
      if (!winner) {
        this.setState({
          ticTacBoard: updatedBoard,
          startGame: false
        });
      }
    }
    return winner;
  };

  render() {
    console.log(this.state.ticTacBoard);
    let warningMessage = '';
    if (this.state.warningMessage) {
      warningMessage = (
          <Alert color="warning">
            Ops! Pick Another Field
          </Alert>
      );
    }
    let finishGame = '';
    if (this.state.winner && !this.state.startGame) {
      finishGame = (
          <Alert color="success">
            <strong>VICTORY: </strong>
            <strong>{this.state.winner} </strong> Won The Game
          </Alert>
      );
    } else if (!this.state.winner && !this.state.startGame) {
      finishGame = (
          <Alert color="success">
            <strong>EQUAL: </strong>Start New Game
          </Alert>
      );
    }
    const ticTacListItem = this.state.ticTacBoard.map((field, index) => {
      let hoverAll = 'hoverAll';
      if (!this.state.startGame) {
        hoverAll = '';
      }
      return (
          <TicTacListItem
              hoverAll={hoverAll}
              activeDrawWinner={field.drawField}
              playerClick={(e) => this.playerClickHandler(e, index)}
              key={index}>
            {field.field}
          </TicTacListItem>
      );
    });
    return (
        <Aux>
          <div style={{textAlign: 'center'}}>
            <div style={{ display: 'inline-block', width: '620px' }}>
              {warningMessage}
              {finishGame}
            </div>
          </div>
          <ContentCSS>
            <FirstPlayer />
            <div>
              <BlockCSS>
                {ticTacListItem}
              </BlockCSS>
            </div>
            <SecondPlayer />
          </ContentCSS>
        </Aux>
    );
  }
}

export default TicTacToeList;