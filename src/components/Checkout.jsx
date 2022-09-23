/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartTable from './CartTable';

const Checkout = () => {
	const data = useSelector((state) => state.productReducer);
	const products = data.products.products;
	const cartData = data.cart;
	const cartItemsArray = []

	const [cart, setCart] = useState(cartItemsArray);
	const [price, setPrice] = useState(0);

	const cartId = [];
	cartData.map((item) => {
		cartId.push(item.id);
	})

	products.map((item) => {
		const newItem = {};
		if (cartId.includes(item.id.toString())) {
			newItem.id = item.id;
			newItem.title = item.title;
			newItem.image = item.images[0];
			newItem.price = item.price;
			cartData.map((obj) => {
				if (obj.id == item.id) {
					newItem.quantity = parseInt(obj.quan)
				}
			});
			cartItemsArray.push(newItem);
		};
	});

	const handleClick = (item, num) => {
		const index = cart.indexOf(item);
		const arr = cart;
		arr[index].quantity +=num;		
		
		if (arr[index].quantity === 0) {
			arr[index].quantity = 1;
		}
		setCart([...arr]);
		handlePrice()
	};

	const handlePrice = () => {
		let total = 0;
		cart.map((item) => total += item.price * item.quantity)
		setPrice(total);
	};

	useEffect(() => {
		handlePrice();
	}, []);

	return (
		<div className="flex justify-center items-center lg:justify-around lg:items-start px-24 py-10 flex-col lg:flex-row">
			<div className="items-left border p-4 mr-3 my-4">
				{
					(data.cart.length > 0) ? (<CartTable data={cart} handleClick={handleClick} handlePrice={handlePrice} />) :<p className="text-2xl text-red-500 font-bold">Cart Empty. Add items</p>
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
