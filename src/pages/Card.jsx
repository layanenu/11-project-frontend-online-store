import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as api from '../services/api';

class Card extends Component {
  state = {
    product: [],
    localEstado: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await api.getProductById(id);
    await this.getLocal();
    this.setState({
      product: response,
    });
  }

  getLocal() {
    const pegarlocal = JSON.parse(localStorage.getItem('produto')) || [];
    this.setState({ localEstado: pegarlocal });
  }

  addCarrinho = async (id) => {
    const { product, localEstado } = this.state;
    console.log(product);
    const igual = localEstado.some((e) => e.id === id);// procura se existe produto igual do que veio lo local com o produto clicado
    if (igual) {
      product.amount += 1; // adc +1 se for igual
      const existe = localEstado.findIndex((e) => e.id === id);
      localEstado.splice(existe, 1);// remove um elemento do índice q é o(existe)
      localEstado.push(product);// coloco no state o produto ja atualizado
      localStorage.setItem('produto', JSON.stringify(localEstado));// salvo novamente em local
    } else {
      product.amount = Number(1);// adc uma chave nova com o valor 1
      localEstado.push(product);// salvo o produto no state ja atualizado
      localStorage.setItem('produto', JSON.stringify(localEstado));// salvo em local
    }
  };

  render() {
    const { product } = this.state;
    // console.log(product);
    return (
      <div>
        <div data-testid="product">
          <p data-testid="product-detail-name">{product.title}</p>
          <img
            data-testid="product-detail-image"
            src={ product.thumbnail }
            alt={ product.title }
          />
          <p data-testid="product-detail-price">{`R$: ${product.price}`}</p>
          <button
            key={ product.title }
            data-testid="product-detail-add-to-cart"
            type="button"
            onClick={ () => this.addCarrinho(product.id) }
          >
            Adicionar
          </button>
        </div>
        <div>
          <ul>
            {product && product.attributes
              && product.attributes.map((element) => (
                <li key={ element.id }>
                  <p>{`${element.name}: ${element.value_name}`}</p>
                </li>
              ))}
          </ul>
        </div>
        <Link
          to="/carrinho"
        >
          <button
            type="button"
            data-testid="shopping-cart-button"
          >
            {' '}
            Carrinho
          </button>
        </Link>
      </div>
    );
  }
}

Card.propTypes = {
  id: PropTypes.string,
}.isRequired;

export default Card;
