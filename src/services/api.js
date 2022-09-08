// import * as api from "./services/api";

export async function getCategories() {
  const response = await fetch(

    "https://api.mercadolibre.com/sites/MLB/categories"


  );
  const categories = await response.json();
  return categories;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  if (!query) {

    const responseQuery = await fetch(
      `https://api.mercadolibre.com/sites/MLB/search?q=${query}`
    );
    const categoria = await responseQuery.json();
    return categoria;
  }
  if (!categoryId) {
    const responseQuery = await fetch(
      `https://api.mercadolibre.com/sites/MLB/search?q=${categoryId}`
    );
    const categoria = await responseQuery.json();
    return categoria;
  }
  const responseQuery = await fetch(
    `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`
  );

  const categoria = await responseQuery.json();
  return categoria;
}
export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você :slight_smile:
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.a
}
