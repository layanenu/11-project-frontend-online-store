import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as api from '../services/api';

class TelaPrincipal extends React.Component {
  state = {
    listProduct: [],
    redirect: false,
    value: '',
    localestado: [],
  };

  componentDidMount() {
    const pegarlocal = JSON.parse(localStorage.getItem('produto')) || [];
    this.setState({ localestado: pegarlocal });
  }

  handleClick = () => {
    this.setState({ redirect: true });
  };

  handleChange = (event) => {
    const values = event.target.value;
    this.setState({ value: values });
  };

  handleClickQuery = async () => {
    const { value } = this.state;
    const request = await api.getProductsFromCategoryAndQuery('', value);
    this.setState({
      listProduct: request.results,
    });
  };

  handleCategory = async (event) => {
    const request = await api.getProductsFromCategoryAndQuery(event.target.name, null);
    this.setState({ listProduct: request.results });
  };

  adcCarrinho = async (id) => {
    const { listProduct, localestado } = this.state;
    const produto = listProduct.find((element) => element.id === id);// adc ao array nova o produto do list q for igual ao produto clicado
    const igual = localestado.some((e) => e.id === produto.id);// procura se existe produto igual do que veio lo local com o produto clicado
    if (igual) {
      produto.amount += 1; // adc +1 se for igual
      const existe = localestado.findIndex((e) => e.id === produto.id);
      localestado.splice(existe, 1);// remove um elemento do índice q é o(existe)
      localestado.push(produto);// coloco no state o produto ja atualizado
      localStorage.setItem('produto', JSON.stringify(localestado));// salvo novamente em local
    } else {
      produto.amount = Number(1);// adc uma chave nova com o valor 1
      localestado.push(produto);// salvo o produto no state ja atualizado
      localStorage.setItem('produto', JSON.stringify(localestado));// salvo em local
    }
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

              <div key={ element.id }>
                <Link
                  to={ `/card/${element.id}` }
                  data-testid="product-detail-link"
                >
                  <li data-testid="product">
                    <p>{element.title}</p>
                    <img src={ element.thumbnail } alt={ element.title } />
                    <p>{`R$: ${element.price}`}</p>
                  </li>
                </Link>
                <button
                  data-testid="product-add-to-cart"
                  type="button"
                  onClick={ () => this.adcCarrinho(element.id) }
                >
                  Adicionar
                </button>
              </div>
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
