/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchProducts, fetchCategories } from './feature/ProductsSlice';
import Nav from './components/Nav';
import Products from './components/Products';
import Checkout from './components/Checkout';
import ThankYou from './components/ThankYou';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Nav />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/thankyou" element={<ThankYou />} />
      </Routes>
    </div>
  );
}

export default App;
