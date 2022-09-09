import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as api from '../services/api';

class TelaPrincipal extends React.Component {
  state = {
    listProduct: [],
    redirect: false,
    value: '',
  };

  handleClick = () => {
    this.setState({ redirect: true });
  };

  handleChange = (event) => {
    const values = event.target.value;
    this.setState({ value: values });
  };

  handleClickQuery = async () => {
    const { value } = this.state;
    console.log(value);
    const request = await api.getProductsFromCategoryAndQuery('', value);
    console.log(request);
    this.setState({
      listProduct: request.results,
    });
  };


  handleCategory = async (event) => {
    const request = await api.getProductsFromCategoryAndQuery(event.target.name, null);
    this.setState({ listProduct: request.results });
  };



  render() {
    const { listProduct, redirect } = this.state;
    const { produtoCategoria } = this.props;

    return (
      <div>
        <label htmlFor="procura">
          <input
            onChange={ this.handleChange }
            data-testid="query-input"
            type="text"
            name="procura"
          />
        </label>
        <button
          type="button"
          data-testid="query-button"
          onClick={ this.handleClickQuery }
        >
          Buscar
        </button>

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
            <div key={ element.id }>
              <button
                type="button"
                data-testid="category"
                onClick={ this.handleCategory }
                name={ element.id }
              >
                {element.name}
              </button>
            </div>
          ))}
        </div>
        <ul>
          {listProduct.length === 0 ? (
            <p> Nenhum produto foi encontrado</p>
          ) : (
            listProduct.map((element) => (
              <li data-testid="product" key={ element.id }>
                <p>{element.title}</p>
                <img src={ element.thumbnail } alt={ element.title } />
                <p>{`R$: ${element.price}`}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    );
  }
}
TelaPrincipal.propTypes = {
  produtoCategoria: PropTypes.shape({}),
}.isRequired;

export default TelaPrincipal;
