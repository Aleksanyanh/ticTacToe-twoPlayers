import React, { Component } from 'react';

import './TicTacListItem.css';

class TicTacListItem extends Component {
  render() {
    let boxCSS = ['boxCSS'];
    boxCSS.push(this.props.hoverAll);
    if (this.props.activeDrawWinner) {
      boxCSS.push('activeDrawRed');
    }

    return (
        <div className={boxCSS.join(' ')} onClick={this.props.playerClick}>
          {this.props.children}
        </div>
    );
  }
}

export default TicTacListItem;