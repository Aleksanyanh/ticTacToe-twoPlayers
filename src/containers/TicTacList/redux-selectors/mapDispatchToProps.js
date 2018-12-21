import { initGame, playerClick } from '../../../store/actions/ticTacList';

export const mapDispatchToProps = (dispatch) => {
  return {
    initGame: () => dispatch(initGame()),
    playerClick: (e, i) => dispatch(playerClick(e, i))
  }
};
