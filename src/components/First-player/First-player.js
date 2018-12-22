import React from 'react';

import './First-player.css';
import X from '../../assets/images/tic-tac-toe-X.png'

const firstPlayer = (props) => {
  const style = ['firstPlayer', props.activePlayer];
  return (
      <div className={style.join(' ')}>
        <div className="leftSide">
          <div className="X"><img src={X} alt="First Player" /></div>
          <h3>First Player: <span>{props.name}</span></h3>
          <h3>Score: <span>{props.score}</span></h3>
        </div>
      </div>
  );
};


export default firstPlayer;