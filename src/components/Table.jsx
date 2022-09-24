import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { productQuantity } from '../feature/ProductsSlice';
import { addToCart } from '../feature/ProductsSlice';

const Table = (data) => {
	const dispatch = useDispatch();
	const [products, setProducts] = useState([]);

	useEffect(() => {
		setProducts(data.data);
	}, [data.data])

	const handleChange = (e, item) => {
		console.log('input');
		const value = parseInt(e.target.value);
		const obj = {}
		obj.item = item;
		obj.value = value;
		console.log(obj)
		if (e.target.value >= 1) {
			dispatch(productQuantity(obj));
			console.log(products);
		}
	};

	const handleClick = (e) => {
		const id = parseInt(e.target.id);
		dispatch(addToCart(id));
	};

	return (
		<div className="flex flex-col">
			<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
					<div className="overflow-x-auto">
						<table className="min-w-full">
							<thead className="border-b">
								<tr>
									<th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
										Product Image
									</th>
									<th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
										Product Name
									</th>
									<th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
										Brand
									</th>
									<th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
										Stock
									</th>
									<th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
										Price
									</th>
									<th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
										Buy
									</th>
								</tr>
							</thead>
							<tbody>
								{
									products.map((item) => (
										<tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
											<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
											  <img src={item.image} alt={item.title} className="w-14" />
											</td>
											<td className="text-sm text-gray-900 font-light px-6 py-4 w-12">
												{item.name}
											</td>
											<td className="text-sm text-gray-900 font-light px-6 py-4 w-12">
												{item.brand}
											</td>
											<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
											  {(item.stock > 10) ? <p className="text-green-500 font-bold">In Stock</p> : <p className="text-red-400 font-bold">No Stock</p>}
											</td>
											<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
												${item.price}
											</td>
											<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
											<div id={item.id} className="flex justify-between items-center flex-row">
												<input type="number" name={item.title} defaultValue={item.quantity} onChange={ (e) => handleChange(e, item) } className="bg-slate-200 w-9 mx-2 text-center" />
												<p>Cart</p>
												<input type="checkbox" className="m-1" id={item.id} name={item.title} onClick={ (e) => handleClick(e) } />
											</div>
											</td>
										</tr>
									))
								}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Table;
