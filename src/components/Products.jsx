import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts, searchProducts, searchCategories } from '../feature/ProductsSlice';
import Table from './Table';

const Products = () => {
	const dispatch = useDispatch();
	const [search, setSearch] = useState('');

	// search Products
	const handleClick = (e) => {
		e.preventDefault();
		dispatch(searchProducts(search));
	}

  const handleReset = (e) => {
    e.preventDefault();
    dispatch(fetchProducts());
  }

	// Filter Categories
	const handleChange = (e) => {
		e.preventDefault();
		dispatch(searchCategories(e.target.value));
	}

	const products = useSelector((state) => state.productReducer.products);
	const categories = useSelector((state) => state.productReducer.categories);

	return (
    <div>
      <div className="bg-slate-100 flex justify-between items-center px-16 py-5">
        <div className="flex justify-center items-center">
          <select className="block appearance-none w-32 bg-gray-200 border border-gray-100 text-gray-700 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" onChange={(e) => { handleChange(e); }}>
            <option value="">--select--</option>
            {
              categories.map((obj) => (
                <option key={obj}>{obj}</option>
              ))
            }
          </select>
          <button type="button" className="border mx-2 bg-gray-600 px-2 rounded text-white pb-1" onClick={(e) => {handleReset(e)}}>reset</button>
        </div>
        <div id="reset-button">&nbsp;</div>
        <div className="flex justify-center items-center">
          <div>
            <input type="text" className="shadow bg-gray-100 hover:bg-white appearance-none border border-slate-300 rounded w-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="search" onChange={(e) => { setSearch((e.target.value)); }} />
            <button type="button" className="bg-slate-600 hover:bg-slate-800 text-white font-bold px-2 py-1 mx-2 rounded focus:outline-none focus:shadow-outline" onClick={(e) => { handleClick(e); }}>Search</button>
          </div>
          <Link to="/checkout" className="bg-indigo-600 hover:bg-gray-600 text-white font-bold px-2 mx-2 py-1 rounded focus:outline-none focus:shadow-outline">Go To Cart</Link>
        </div>
      </div>
      <>
        {
          (products !== undefined) ? <Table data={products} /> : <p className="text-center text-2xl mt-12">Loading....</p>
        }
      </>
    </div>
	);
};

export default Products;
