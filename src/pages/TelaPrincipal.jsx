import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class TelaPrincipal extends React.Component {
  state = {
    listProduct: [],
    redirect: false,
  };

  handleClick = () => {
    this.setState({ redirect: true });
  };

  render() {
    const { listProduct, redirect } = this.state;
    const { produtoCategoria } = this.props;

    return (
      <div>
        <label htmlFor="procura">
          <input type="text" name="procura" />
        </label>

        {listProduct.length <= 0 && (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        )}
        <button
          type="button"
          data-testid="shopping-cart-button"
          onClick={ this.handleClick }
        >
          Carrinho
        </button>
        {redirect && (
          <Redirect data-testid="shopping-cart-button" to="/carrinho" />
        )}
        <div>
          {produtoCategoria.map((element) => (
            <button
              type="button"
              data-testid="category"
              key={ element.id }
            >
              {element.name}
            </button>
          ))}
        </div>
      </div>
    );
  }
}
TelaPrincipal.propTypes = {
  produtoCategoria: PropTypes.shape({}),
}.isRequired;

export default TelaPrincipal;
