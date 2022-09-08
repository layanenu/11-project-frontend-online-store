import React from "react";

class TelaPrincipal extends React.Component {
  state = {
    listProduct: [],
    redirect: false,
  };

  handleClick = () => {
    this.setState({ redirect: true });
  };

  render() {
    const { listProduct } = this.state;

    return (
      <div>
        <label htmlFor="procura">
          <input type="text" name="procura" />
        </label>
        <button type="button" onClick={this.handleClick}>
          Carrinho
        </button>
        {redirect && (
          <Redirect data-testid="shopping-cart-button" to="/carrinho" />
        )}
        {listProduct.length <= 0 && (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        )}
      </div>
    );
  }
}
export default TelaPrincipal;
