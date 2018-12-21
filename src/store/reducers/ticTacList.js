import { INIT_GAME, PLAYER_CLICK } from '../actionTypes';

const initialState = {
  ticTacBoard: [],
  firstPlayer: 'X',
  secondPlayer: '0',
  nextPlayer: '',
  emptyField: '',
  fieldLimit: 9,
  winner: '',
  warningMessage: false,
  scores: {
    firstScore: 0,
    secondScore: 0
  },
  startGame: false,
};

// START THE GAME FROM SCRATCH
const initGame = (state, action) => {

  // INITIATE THE STATE AND DRAW THE TIC TAC TOE BOARD WHEN THE GAME START
  const initTicTacBoard = [];
  for (let i = 0; i < state.fieldLimit; i++) {
    initTicTacBoard.push({ field: state.emptyField, drawField: '' });
  }

  return {
    ...state,
    ticTacBoard: initTicTacBoard,
    nextPlayer: 'X',
    startGame: true
  }
};

// CONTINUE THE GAME UNTIL ONE PLAYER WIN OR THE GAME IS OVER END NO WINNER
const playerClick = (state, action) => {

  // IF THERE IS A WINNER THE GAME IS OVER AND DON'T LET CONTINUE THE GAME
  if (!state.startGame) return;

  const ticTacBoard = [...state.ticTacBoard];
  const firstPlayer = state.firstPlayer;
  const secondPlayer = state.secondPlayer;
  const nextPlayer = state.nextPlayer;
  const target = action.event.target.textContent;

  // THE FIRST PLAYER TURN
  if (target === '' && nextPlayer === firstPlayer) {

    // UPDATE THE STATE EVERY TIME WHEN THE FIRST PLAYER PICK AN EMPTY FIELD
    const updatedBoard = updateTicTacBoard(ticTacBoard, firstPlayer, action.index);

    // CALCULATE AND CHECK IF THE FIRST PLAYER, END THE GAME, OTHERWISE CONTINUE
    return callWinner(firstPlayer, secondPlayer, updatedBoard, 'First Player', state);
  }

  // THE SECOND PLAYER TURN
  if (target === '' && nextPlayer === secondPlayer) {

    // UPDATE THE STATE EVERY TIME WHEN THE SECOND PLAYER PICK ON EMPTY FIELD
    const updatedBoard = updateTicTacBoard(ticTacBoard, secondPlayer, action.index);

    // CALCULATE AND CHECK IF THE SECOND PLAYER WIN, END THE GAME, OTHERWISE CONTINUE
    return callWinner(secondPlayer, firstPlayer, updatedBoard, 'Second Player', state);
  }

  // IF THE PLAYER PICK ON PICKED FIELD SHOW WARNING
  if (target !== '') {
    return {
      ...state,
      warningMessage: true
    };
  }
};

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

const callWinner = (winningPlayer, loosingPlayer, updatedBoard, winnerName, state) => {
  const winner = checkWinner(winningPlayer, updatedBoard, state);
  if (winner === 'no') {
    return {
      ...state,
      ticTacBoard: updatedBoard,
      startGame: false
    };
  } else if (winner) {
    return {
      ...state,
      ticTacBoard: updatedBoard,
      winner: winnerName,
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
      winner = 'no';
    }
  }

  // CALCULATE AND CHECK THE WINNER IF THE PLAYER PICK 3 TIME
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
    case INIT_GAME: return initGame(state, action);
    case PLAYER_CLICK: return playerClick(state, action);
    default: return state;
  }
};

export default reducer;