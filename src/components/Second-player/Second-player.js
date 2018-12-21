import React from 'react';

import './Second-player.css';
import O from '../../assets/images/tic-tac-toe-O.png';

const secondPlayer = (props) => {
  const style = ['secondPlayer', 'activePlayer2'];
  return (
      <div className={style.join(' ')}>
        <div className="rightSide">
          <div className="O"><img src={O} alt="Second Player" /></div>
          <h3>Second: <span>Jane</span></h3>
          <h3>Score: <span>2</span></h3>
        </div>
      </div>
  );
};


export default secondPlayer;