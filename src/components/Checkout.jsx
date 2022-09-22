import React from 'react';
import { useSelector } from 'react-redux';

const Checkout = () => {
	console.log('Checkout')

	const cart = useSelector((state) => (state.productReducer).cart);

	console.log(cart);

	return (
		<div>Checkout</div>
	);
};

export default Checkout;
