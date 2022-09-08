import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";
import TelaPrincipal from "./pages/TelaPrincipal";
import Carrinho from "./pages/Carrinho";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={TelaPrincipal} />
          <Route exact path="/carrinho" component={Carrinho} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
