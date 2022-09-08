import React from 'react';

class TelaPrincipal extends React.Component {
  state = {
    listProduct: [],
  };

  render() {
    const { listProduct } = this.state;

    return (
      <div>
        <label htmlFor="procura">
          <input
            type="text"
            name="procura"
          />
        </label>
        {listProduct.length <= 0 && (

          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>

        )}
      </div>

    );
  };
}
export default TelaPrincipal;
