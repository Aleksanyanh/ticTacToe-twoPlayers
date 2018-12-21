export const mapStateToProps = (state) => {
  return {
    ticTacBoard: state.ticTacBoard,
    winner: state.winner,
    warningMessage: state.warningMessage,
    startGame: state.startGame
  }
};