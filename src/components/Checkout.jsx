/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartProductQuantity, fetchProducts } from '../feature/ProductsSlice';
import CartTable from './CartTable';

const Checkout = () => {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.productReducer.products);
	const cart = useSelector((state) => state.productReducer.cart);

	let cartItems = products.filter((item) => cart.includes(item.id));
	const [price, setPrice] = useState(0);

	const handleClick = (item, num) => {
		const obj = {};
		obj.item = item;
		obj.num = num;
		if (!(item.quantity === 0 && num === -1)) {
			dispatch(cartProductQuantity(obj));
		}
		handlePrice();
	};

	const handlePrice = () => {
		let total = 0;
		cartItems.map((item) => total += item.price * item.quantity)
		setPrice(total);
	};

	useEffect(() => {
		dispatch(fetchProducts());
		handlePrice();
	}, []);

	return (
		<div className="flex justify-center items-center lg:justify-around lg:items-start px-24 py-10 flex-col lg:flex-row">
			<div className="items-left border p-4 mr-3 my-4">
				{
					(cart.length > 0) ? (<CartTable data={cartItems} handleClick={handleClick} handlePrice={handlePrice} />) :<p className="text-2xl text-red-500 font-bold">Cart Empty. Add items</p>
				}
			</div>
			<div className="w-72 p-4 h-auto border">
				<h2 className="text-xl font-semibold m-2">Cart totals</h2>
				<div className="w-full flex justify-between items-center mx-auto py-4">
					<span className="text-gray-700">Subtotal</span>
					<p className="font-bold text-slate-700">${price}</p>
				</div>
				<div className="w-full flex text-sm justify-between items-center mx-auto py-1">
					<span className="text-gray-700">Tax</span>
					<p className="font-semibold text-slate-600">$50</p>
				</div>
				<hr/>
				<div className="text-2xl w-full flex justify-between items-center mx-auto py-4">
					<span className="font-semibold text-gray-800">Total</span>
					<p className="font-bold text-slate-900">${price + 50}</p>
				</div>
				<button type="button" className="w-full border rounded-2xl p-2 my-3 mx-auto bg-blue-700 text-white"><Link to="/thankyou">PROCEED TO CHECKOUT</Link></button>
			</div>
		</div>
	);
};

export default Checkout;
