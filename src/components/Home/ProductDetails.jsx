import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './home.css'
import Spinner from '../Spinner/Spinner';

const ProductDetails = ({ selectedProduct }) => {
  if (!selectedProduct) {
    return <Spinner/>
  }

  return (
    <div className="product-details">
      <h1>Product Details</h1>
      <div>
        <img src={selectedProduct.thumbnail} alt="" />
        <h2>{selectedProduct.title}</h2>
        <p>{selectedProduct.description}</p>
        <h1>Price: ${selectedProduct.price}/-</h1>
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedProduct: state.selectedProduct,
});

export default connect(mapStateToProps)(ProductDetails);
