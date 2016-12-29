import React from 'react'
import { connect } from 'react-redux'

// Stateless component
const Products = ({ products }) => (
  <section>
    { products.map(product => (<li key={product.id}>{product.name}[{product.price}]: {product.description}</li>))}
  </section>
);

const mapStateToProps = ({ products }) => ({ products });
export default connect(mapStateToProps)(Products);