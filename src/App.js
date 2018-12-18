import React, { Component } from 'react';

import './App.css';
import TicTacList from './containers/TicTacList/TicTacList';

class App extends Component {
  render() {
    return (
        <div className="App">
          <TicTacList />
        </div>
    )
  }
}

export default App;
