import {
  initGame,
  inputFirstPlayerName,
  inputSecondPlayerName,
  resetGame,
  savePlayers
} from '../../../store/actions/ticTacList';

export const mapDispatchToProps = (dispatch) => {
  return {
    inputFirstPlayerName: (e) => dispatch(inputFirstPlayerName(e)),
    inputSecondPlayerName: (e) => dispatch(inputSecondPlayerName(e)),
    savePlayers: () => dispatch(savePlayers()),
    initGame: () => dispatch(initGame()),
    resetGame: () => dispatch(resetGame())
  }
};
