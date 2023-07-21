import axios from 'axios';

const setProducts = (products) => ({
     type: 'SET_PRODUCTS',
     payload: products,
});


const selectProduct = (product) => ({
  type: 'SELECT_PRODUCT',
  payload: product,
});

export const fetchProducts = () => {
  return (dispatch) => {
    axios
      .get('https://dummyjson.com/products')
      .then((response) => {
           dispatch(setProducts(response.data.products));
          })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  };
};

export const setSelectedProduct = (product) => {
  return (dispatch) => {
    dispatch(selectProduct(product));
  };
};
