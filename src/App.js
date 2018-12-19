import React, { Component } from 'react';

import './App.css';
import TicTacList from './containers/TicTacList/TicTacList';
import Header from './containers/Header/Header';

class App extends Component {

  render() {
    return (
        <div className="App">
          <Header />
          <TicTacList />
        </div>
    )
  }
}

export default App;
