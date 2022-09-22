import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchCategories } from '../feature/ProductsSlice';

const Products = () => {
	const dispatch = useDispatch();

	useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, []);

	const products = useSelector((state) => state.productReducer.products.products);
	const categories = useSelector((state) => state.productReducer.categories);

	console.log(products);
	console.log(categories);

	console.log('Products');
	return (
		<div>Products
			{
				products.map((item) => (
					<div className="border w-32">
					  <img src={item.images[0]} alt={item.title} />
					  <h1>{item.title}</h1>
					</div>
				))
			}
		</div>
	);
};

export default Products;
