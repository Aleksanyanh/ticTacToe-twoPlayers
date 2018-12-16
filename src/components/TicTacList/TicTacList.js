import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TicTacListItem from './TicTacListItem/TicTacListItem';

const BlockCSS = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 306px;
  box-shadow: 0 0 8px #661156;
  padding: 10px;
  z-index: 100;
`;

const players = ['X', '0'];

const ticTacToeList = (props) => {
  let ticTacListItem = [];
  for (let i = 0; i < props.fieldsCount; i++) {
    let activePlayer = '';
    if (props.activePlayerIndex === i) {
      activePlayer = players[props.currentPlayer]
    } else if (props.activePlayerIndex !== i && props.playingCount[i].prevIndex === i) {
      activePlayer = props.playingCount[i].prevPlayer;
    }
    else {
      activePlayer = '';
    }
    ticTacListItem.push(
        <TicTacListItem
            key={i}
            clicked={(e) => props.clicked(e, {prevIndex: i, prevPlayer: players[i]})}>
          {activePlayer}
        </TicTacListItem>
    );
  }

  return (
      <BlockCSS>
        {ticTacListItem}
      </BlockCSS>
  );
};

ticTacToeList.propTypes = {
  fieldsCount: PropTypes.number,
  clicked: PropTypes.func
};

export default ticTacToeList;