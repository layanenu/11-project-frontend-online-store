import React from 'react';

class Carrinho extends React.Component {

  state = {
    produto: [],
  };

  componentDidMount() {
    const pegarlocal = JSON.parse(localStorage.getItem('produto')) || [];

    this.setState({ produto: pegarlocal });
  }

  render() {
    const { produto } = this.state;

    return (
      <div>
        <h1>Carrinho de compras</h1>
        {produto.length === 0 ? (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        ) : (
          produto.map((element) => (
            <>
              <div data-testid="product" key={ element.id }>
                <p data-testid="shopping-cart-product-name">{element.title}</p>
                <p>{`R$: ${element.price}`}</p>
              </div>
              <p data-testid="shopping-cart-product-quantity">
                {element.amount}
              </p>
            </>
          ))
        )}
      </div>
    );
}
export default Carrinho;
