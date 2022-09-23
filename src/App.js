import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Products from './components/Products';
import Checkout from './components/Checkout';
import ThankYou from './components/ThankYou';

function App() {
  return (
    <div className="">
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
