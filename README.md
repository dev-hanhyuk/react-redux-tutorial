# React/Redux Process
For complex applications, redux plays as a centralized state management system, which enables developers to conveniently access different states no matter where you are working on. All you have to do is apply `connect` to components.


## state & dispatch
States are variables that you want to manage and control through application. Dispatches are very much watchers. Since web environment needs a lot of asynchronous operations, which requires application to handle delayed information from the remote server. Dispatch makes it possible for users to access certain functions in an asynchronous setting, comming back to the function even after the function has been excuted before the user retrieved data.


## Thought process
1. Figure out what state you need, and imagine the initial state format(array, object, or others)
2. Create individual reducers
3. Combine individual reducers into a `root reducer`
4. Integrate the root reducer with a store
5. Provide the application with `store` through `<Provider>`
6. Create a `Products` component to fetch products data


## CASE: Fetching all products information from the server
We assume that we are going to build an application which fetches all the product information from the server

### Figure out what state you need
In this case, we would need `products` as a variable to store all the products information, and the products would be fetched with a format of ARRAY of objects.

products = [ product1, product2, ... ]

product1 = { id: 1, name: 'product1', price: '35.00', description: 'this is product 1', image: 'images/1.jpg' }
product2 = { id: 2, name: 'product2', price: '29.99', description: 'this is product 2', image: 'images/2.jpg' }


### Create individual reducers
We assumed that the products data will be an array. Therefore, initial state would be empty array.
Each reducer takes `state` and `action` as arguments. Reducer handles action requested by users, and applies the action to the proper action type.


```javascript
// PRODUCTS REDUCER
// ROOT/actions/products.js
const INITIAL_STATE = [];

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
```

### Combine individual reducers into a `root reducer`
Currently the rootReducer only has one `products` reducer, however, it will soon have multiple reducers.

```javascript
// ROOT REDUCER
// ROOT/reducers/index.js
import { combineReducers } from 'redux';
import productsReducer from './products';// import an individual products reducer

const rootReducer = combineReducers({
  products: productsReducer
});

export default rootReducer;
```

### Integrate the root reducer with a store
`redux` has `createStore` and `applyMiddleware` methods.
<!-- APPLY MIDDLEWARE!!! -->


```javascript
// STORE
// ROOT/store.js
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk' //we will soon need asynchronous dispatch, so set this up in advance

const store = createStore(rootReducer, applyMiddleware(createLogger(), thunkMiddleware));
export default store;
```


### Provide the application with `store` through `<Provider>`
`react-redux` module provides a method called `Provider` which allows the application access centralized store props anywhere in the application. We need to wrap the entire application with `<Provider>` tag with `store` to utilize this functionality.


```javascript
// ROOT/main.js

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import store from './store'

// currently application shows `Products` component by default
import Products from '_components/Products'

render (
  <Provider store={store}>
    <Products />
  </Provider>,
  document.getElementById('main')
);
```


### Create a `Products` component to fetch products data
`INITIAL_STATE` is supposed to be [](empty array), however, until we set up an actual API, we will have some preset items as default

```javascript
// ROOT/reducers/products.js
const INITIAL_STATE = [
  { id: 1, name: 'product1', price: '35.00', description: 'this is product 1', image: 'images/1.jpg' },
  { id: 2, name: 'product2', price: '29.99', description: 'this is product 2', image: 'images/2.jpg' },
  { id: 3, name: 'product3', price: '25.99', description: 'this is product 3', image: 'images/3.jpg' }
];
```

In ES6, instead of `this.props.products`, we can use `({ products })`. By using `connect` method, now we can access the props in the 'centralized' `store`. This is the moment that redux becomes really powerful for complex applications. Also, in React, you need to set `key` to iterate array items.

```jsx
// ROOT/components/Products.js
import React from 'react'
import { connect } from 'react-redux'

// Stateless component
const Products = ({ products }) => (
  <section>
    { products.map(product => (
      <li key={product.id}>{product.name}[{product.price}]: {product.description}</li>
    ))}
  </section>
);

const mapStateToProps = ({ products }) => ({ products });
export default connect(mapStateToProps)(Products);
```

