import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TelaPrincipal from './pages/TelaPrincipal';
import Carrinho from './pages/Carrinho';
import * as api from './services/api';

import './App.css';

class App extends Component {
  state = {
    produtoCategoria: [],
  };

  componentDidMount() {
    const request = async () => {
      const result = await api.getCategories();

      this.setState({
        produtoCategoria: result,
      });
    };
    api.getProductsFromCategoryAndQuery()
      .then((categoria) => { console.log(categoria); });
    request();
  }

  render() {
    const { produtoCategoria } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (<TelaPrincipal
              { ...props }
              produtoCategoria={ produtoCategoria }
            />) }
          />
          <Route exact path="/carrinho" component={ Carrinho } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
