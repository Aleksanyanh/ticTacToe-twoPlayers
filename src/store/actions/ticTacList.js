import { INIT_GAME, PLAYER_CLICK } from '../actionTypes';

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
