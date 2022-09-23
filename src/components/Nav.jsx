import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="bg-slate-800 text-white flex justify-between items-center h-10 px-28">
      <p>E-Commerce</p>
      <ul className="flex flex-row">
        <li className="mx-4"><Link to="/products">Products</Link></li>
        <li className="mx-4"><Link to="/checkout">Cart</Link></li>
      </ul>
    </div>
  );
};

export default Nav;
