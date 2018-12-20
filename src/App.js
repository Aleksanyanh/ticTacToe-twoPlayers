import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import './App.css';
import TicTacList from './containers/TicTacList/TicTacList';
import Header from './Header/Header';

class App extends Component {

  render() {
    return (
        <div className="App">
          <Route path="/" component={Header} />
          <Route path="/newGame" component={TicTacList} />
        </div>
    )
  }
}

export default App;
