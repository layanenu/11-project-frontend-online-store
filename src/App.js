import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TelaPrincipal from './pages/TelaPrincipal';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ TelaPrincipal } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
