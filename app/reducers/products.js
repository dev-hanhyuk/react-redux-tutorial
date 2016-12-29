// PRODUCTS REDUCER
// ROOT/actions/products.js

/*
INITIAL_STATE is supposed to be [](empty array), however, until we set up an actual API, we will have some preset items as default
*/

const INITIAL_STATE = [
  { id: 1, name: 'product1', price: '35.00', description: 'this is product 1', image: 'images/1.jpg' },
  { id: 2, name: 'product2', price: '29.99', description: 'this is product 2', image: 'images/2.jpg' },
  { id: 3, name: 'product3', price: '25.99', description: 'this is product 3', image: 'images/3.jpg' }
];

const productsReducer = (state=INITIAL_STATE, action) => {
  switch (action.type) {
    /*
    1. THIS WILL BE FILLED OUT AS YOU NEED TO ADD FUNCTIONALITIES OF ACTINOS such as "fetch products"
    2. If there is no other actions, then the reducer will return INITIAL_STATE[] as default
    */
    default: return state;
  }
}

export default productsReducer;