import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchCategories, searchProducts, searchCategories } from '../feature/ProductsSlice';

const Products = () => {
	const dispatch = useDispatch();
	const [search, setSearch] = useState('');

	useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, []);

	// search Products
	const handleClick = (e) => {
		e.preventDefault();
		dispatch(searchProducts(search));
	}

	const products = useSelector((state) => state.productReducer.products.products);
	const categories = useSelector((state) => state.productReducer.categories);

	console.log(products);
	console.log(categories);

	return (
	  <div>
      <div className="text-center flex justify-between items-center bg-slate-100 h-16 px-12">
        <div>
          Filter
        </div>
        <div className="flex justify-between items-center bg-slate-300">
          <div>
            <div>
              <input type="text" className="" placeholder="search" onChange={(e) => { setSearch((e.target.value)); }} />
              <button type="button" className="mx-2" onClick={(e) => { handleClick(e); }}>Search</button>
            </div>
          </div>
          Cart
        </div>
      </div>
      <div className="flex justify-center items-center flex-wrap flex-col">
        {
          (products !== undefined) ?
					products.map((item) => (
						<div className="border w-32" key={item.id}>
							<img src={item.images[0]} alt={item.title} />
							<h1>{item.title}</h1>
						</div>
					)) : <p>No products to show</p>
        }
      </div>
		</div>
	);
};

export default Products;
