import React from 'react';

import './First-player.css';
import X from '../../images/tic-tac-toe-X.png'

const firstPlayer = (props) => {
  const style = ['firstPlayer', 'activePlayer1'];
  return (
      <div className={style.join(' ')}>
        <div className="leftSide">
          <div className="X"><img src={X} alt="First Player" /></div>
          <h3>First: <span>Jean</span></h3>
          <h3>Score: <span>1</span></h3>
        </div>
      </div>
  );
};


export default firstPlayer;