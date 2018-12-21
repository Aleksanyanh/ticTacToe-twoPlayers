import React, { Component } from 'react';
import styled from 'styled-components';
import { Alert } from 'reactstrap';
import { connect } from 'react-redux';

import TicTacListItem from '../../components/TicTacListItem/TicTacListItem';
import FirstPlayer from '../../components/First-player/First-player';
import SecondPlayer from '../../components/Second-player/Second-player';
import Aux from '../../hoc/Aux';
import { mapStateToProps } from './redux-selectors/mapStateToProps';
import { mapDispatchToProps } from './redux-selectors/mapDispatchToProps';

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

  componentWillMount() {
    this.props.initGame();
  }

  render() {
    const { ticTacBoard, winner, warningMessage, startGame, playerClick } = this.props;
    let warningMessageLocal = '';
    if (warningMessage) {
      warningMessageLocal = (
          <Alert color="warning">
            Ops! Pick Another Field
          </Alert>
      );
    }
    let finishGame = '';
    if (winner && !startGame) {
      finishGame = (
          <Alert color="success">
            <strong>VICTORY: </strong>
            <strong>{winner} </strong> Won The Game
          </Alert>
      );
    } else if (!winner && !startGame) {
      finishGame = (
          <Alert color="success">
            <strong>NO WINNER: </strong>Start New Game
          </Alert>
      );
    }
    const ticTacListItem = ticTacBoard.map((field, index) => {
      let hoverAll = 'hoverAll';
      if (!startGame) {
        hoverAll = '';
      }
      return (
          <TicTacListItem
              hoverAll={hoverAll}
              activeDrawWinner={field.drawField}
              playerClick={(e) => playerClick(e, index)}
              key={index}>
            {field.field}
          </TicTacListItem>
      );
    });
    return (
        <Aux>
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'inline-block', width: '620px' }}>
              {warningMessageLocal}
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

export default connect(mapStateToProps, mapDispatchToProps)(TicTacToeList);