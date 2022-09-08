import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import TelaPrincipal from './pages/TelaPrincipal';

class App extends React.Component {
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
