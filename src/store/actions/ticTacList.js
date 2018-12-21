import {
  INIT_GAME,
  INPUT_FIRST_PLAYER_NAME,
  INPUT_SECOND_PLAYER_NAME,
  PLAYER_CLICK, RESET_GAME,
  SAVE_PLAYERS
} from '../actionTypes';

////////////////// HEADER
export const inputFirstPlayerName = (e) => {
  return {
    type: INPUT_FIRST_PLAYER_NAME,
    event: e
  }
};

export const inputSecondPlayerName = (e) => {
  return {
    type: INPUT_SECOND_PLAYER_NAME,
    event: e
  }
};

export const savePlayers = () => {
  return {
    type: SAVE_PLAYERS
  }
};

export const resetGame = () => {
  return {
    type: RESET_GAME
  }
};

/////////////////// TIC_TAC_LIST
export const initGame = () => {
  return {
    type: INIT_GAME
  }
};

export const playerClick = (e, i) => {
  return {
    type: PLAYER_CLICK,
    event: e,
    index: i
  }
};