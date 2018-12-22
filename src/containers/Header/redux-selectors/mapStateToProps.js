export const mapStateToProps = (state) => {
  return {
    firstPlayerName: state.firstPlayerName,
    secondPlayerName: state.secondPlayerName,
    savedPlayer: state.savedPlayer
  }
};