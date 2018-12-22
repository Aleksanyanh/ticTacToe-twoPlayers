import {
  INIT_GAME,
  INPUT_FIRST_PLAYER_NAME,
  INPUT_SECOND_PLAYER_NAME,
  PLAYER_CLICK, RESET_GAME,
  SAVE_PLAYERS
} from '../actionTypes';

import { isAlphanumeric, isLength, isInt } from 'validator';

const initialState = {
  ticTacBoard: [],
  firstPlayerName: '',
  secondPlayerName: '',
  savedPlayer: false,
  firstPlayer: 'X',
  secondPlayer: '0',
  nextPlayer: '',
  emptyField: '',
  fieldLimit: 9,
  winner: '',
  warningMessage: false,
  scores: [0, 0],
  startGame: false,
};

// START THE GAME FROM SCRATCH
const initGame = (state, action) => {

  // INITIATE THE STATE AND DRAW THE TIC TAC TOE BOARD WHEN THE GAME START
  const initBoard = [];
  for (let i = 0; i < state.fieldLimit; i++) {
    initBoard.push({ field: state.emptyField, drawField: '' });
  }

  return {
    ...state,
    ticTacBoard: initBoard,
    nextPlayer: 'X',
    winner: '',
    startGame: true
  }
};

const inputFirstPlayerName = (state, action) => {
  action.event.persist();
  return {
    ...state,
    firstPlayerName: action.event.target.value
  }
};

const inputSecondPlayerName = (state, action) => {
  action.event.persist();
  return {
    ...state,
    secondPlayerName: action.event.target.value
  }
};

const savePlayers = (state, action) => {
  const firstPLayerName = state.firstPlayerName;
  const secondPLayerName = state.secondPlayerName;
  const valid = checkValidity(firstPLayerName, secondPLayerName);
  if (valid) {
    return {
      ...state,
      savedPlayer: true,
      errorMessage: false
    }
  }

  return {
    ...state,
    errorMessage: true
  }

};

const checkValidity = (firstPLayerName, secondPLayerName) => {
  return (
      isAlphanumeric(firstPLayerName) && isAlphanumeric(secondPLayerName) &&
      isLength(firstPLayerName, { min: 2, max: 30 }) && isLength(secondPLayerName, { min: 2, max: 30 }) &&
      !isInt(firstPLayerName[0]) && !isInt(secondPLayerName[0])
  )
};

// CONTINUE THE GAME UNTIL ONE PLAYER WIN OR THE GAME IS OVER END NO WINNER
const playerClick = (state, action) => {
  if (state.savedPlayer) {
    action.event.persist();

    // IF THERE IS A WINNER THE GAME IS OVER AND DON'T LET CONTINUE THE GAME
    if (!state.startGame) return state;
    const ticTacBoard = [...state.ticTacBoard];
    const firstPlayer = state.firstPlayer;
    const secondPlayer = state.secondPlayer;
    const nextPlayer = state.nextPlayer;
    const firstPlayerName = state.firstPlayerName;
    const secondPlayerName = state.secondPlayerName;
    const target = action.event.target.textContent;

    // THE FIRST PLAYER TURN
    if (target === '' && nextPlayer === firstPlayer) {
      const updatedBoard = updateTicTacBoard(ticTacBoard, firstPlayer, action.index);
      return callWinner(firstPlayer, secondPlayer, updatedBoard, firstPlayerName, state);
    }

    // THE SECOND PLAYER TURN
    if (target === '' && nextPlayer === secondPlayer) {
      const updatedBoard = updateTicTacBoard(ticTacBoard, secondPlayer, action.index);
      return callWinner(secondPlayer, firstPlayer, updatedBoard, secondPlayerName, state);
    }

    // IF THE PLAYER PICK ON PICKED FIELD SHOW WARNING
    if (target !== '') {
      return {
        ...state,
        warningMessage: true
      };
    }
  }

  return state;
};

// UPDATE THE STATE EVERY TIME WHEN THE PLAYER PICK AN EMPTY FIELD
const updateTicTacBoard = (ticTacBoard, player, playerIndex) => {
  let newBoard = [...ticTacBoard];
  newBoard.map((playerField, index) => {
    if (index === playerIndex) {
      playerField.field = player;
      return playerField;
    } else {
      return playerField;
    }
  });
  return newBoard;
};

// CALCULATE AND CHECK IF THERE IS A WINNER, END THE GAME, OTHERWISE CONTINUE
const callWinner = (winningPlayer, loosingPlayer, updatedBoard, winnerName, state) => {
  const winner = checkWinner(winningPlayer, updatedBoard, state);
  if (winner === 'nowinner') {
    return {
      ...state,
      ticTacBoard: updatedBoard,
      winner: '',
      warningMessage: false,
      startGame: false
    };
  } else if (winner) {

    // CALCULATE WINNER SCORES
    let localScores = [...state.scores];
    let firstScore = localScores[0];
    let secondScore = localScores[1];
    if (winner === 'X') {
      firstScore++;
    } else {
      secondScore++;
    }
    localScores = [firstScore, secondScore];
    return {
      ...state,
      ticTacBoard: updatedBoard,
      winner: winnerName,
      scores: localScores,
      warningMessage: false,
      startGame: false
    };
  } else {
    return {
      ...state,
      ticTacBoard: updatedBoard,
      nextPlayer: loosingPlayer,
      warningMessage: false
    };
  }
};

// CHECK THE WINNER
const checkWinner = (winningPlayer, updatedBoard, state) => {
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
    if (playerField.field === winningPlayer) {
      filteredPlayersIndex.push(index);
    }
  });
  if (filteredPlayersIndex.length === 3) {
    calculateForLength3(filteredPlayersIndex);
  } else if (filteredPlayersIndex.length === 4) {
    calculateForLength4(filteredPlayersIndex);
  } else if (filteredPlayersIndex.length === 5) {
    calculateForLength5(filteredPlayersIndex);

    // CHECK IF ALL FIELDS ARE PICKED AND THERE IS NO WINNER, END THE GAME
    if (!winner) {
      winner = 'nowinner';
    }
  }

  // CALCULATE AND CHECK THE WINNER IF THE PLAYER PICK 3 TIME
  function calculateForLength3(filteredPlayersLength3) {
    // debugger
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
            winner = winningPlayer;
            i = winnerModel.length;
            break;
          }
        }
      }
    }
  }

  // CALCULATE AND CHECK THE WINNER IF THE PLAYER PICK 4 TIME
  function calculateForLength4(filteredPlayersIndex) {
    for (let i = 0; i < filteredPlayersIndex.length; i++) {
      let spliceArr = [...filteredPlayersIndex];
      spliceArr.splice(i, 1);
      calculateForLength3(spliceArr);
    }
  }

  // CALCULATE AND CHECK THE WINNER IF THE PLAYER PICK 5 TIME
  function calculateForLength5(filteredPlayersIndex) {
    for (let i = 0; i < filteredPlayersIndex.length; i++) {
      let spliceArr = [...filteredPlayersIndex];
      spliceArr.splice(i, 1);
      calculateForLength4(spliceArr);
    }
  }

  return winner;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_GAME:
      return state = initialState;
    case INIT_GAME:
      return initGame(state, action);
    case INPUT_FIRST_PLAYER_NAME:
      return inputFirstPlayerName(state, action);
    case INPUT_SECOND_PLAYER_NAME:
      return inputSecondPlayerName(state, action);
    case SAVE_PLAYERS:
      return savePlayers(state, action);
    case PLAYER_CLICK:
      return playerClick(state, action);
    default:
      return state;
  }
};

export default reducer;