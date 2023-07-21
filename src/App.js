import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store';
import Home from './components/Home/Home'
import ProductDetails from './components/Home/ProductDetails';
import LikedProducts from './components/Home/LikedProducts';



export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' index element={<Home />} />
          <Route path="/products/:productId"  element={<ProductDetails />} />
          <Route path="/liked-products"  element={<LikedProducts />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
