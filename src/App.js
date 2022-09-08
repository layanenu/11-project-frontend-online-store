import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TelaPrincipal from './pages/TelaPrincipal';

import './App.css';
import * as api from './services/api';

class App extends Component {
  componentDidMount() {
    api.getCategories().then((categories) => { console.log(categories); });
    api.getProductsFromCategoryAndQuery()
      .then((categoria) => { console.log(categoria); });
  }
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
