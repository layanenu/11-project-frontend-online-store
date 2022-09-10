import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as api from '../services/api';

class Card extends Component {
  state = {
    product: '',
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await api.getProductById(id);
    this.setState({
      product: response,
    });
  }

  render() {
    const { product } = this.state;
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
