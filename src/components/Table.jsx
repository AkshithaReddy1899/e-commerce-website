import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import DataTable from 'react-data-table-component';
import { addToCart } from '../feature/ProductsSlice';

const Table = (products) => {
	const dispatch = useDispatch();
	const [quantity, setQuantity] = useState([]);

	const handleClick = (e) => {
		const name = e.target.name;
		const keys = Object.keys(quantity);
		const obj = {
			id: e.target.id,
			quan: (keys.includes(name)) ? quantity[name] : 1, 
		}
		dispatch(addToCart(obj));
	}

	const handleChange = (e) => {
		setQuantity({
			...quantity,
			[e.target.name]: e.target.value
	});
	}

	const data = [];

   products.data.forEach((item) => {
      const obj = {
        ...item,
        img: <img src={item.images[0]} alt={item.title} />,
        cost: `$${item.price}`,
        stocks: (item.stock > 10) ? <p className="text-green-500 font-bold">In Stock</p> : <p className="text-red-400 font-bold">No Stock</p>,
        buy:
  <div id={item.id} className="flex justify-between items-center flex-row">
    <input type="number" name={item.title} value={quantity.name} onChange={(e) => handleChange(e)} placeholder="1" className="bg-slate-200 w-9 mx-2 text-center" />
		<p>Cart</p>
		<input type="checkbox" className="m-1" name={item.title} id={item.id} onChange={(e) => handleClick(e)} />
  </div>,
      };
      data.push(obj);
    });

		const columns = [
			{
				name: 'Image',
				selector: (row) => row.img,
				width: '100px',
			},
			{
				name: 'Title',
				selector: (row) => row.title,
			},
			{
				name: 'Brand',
				selector: (row) => row.brand,
			},
			{
				name: 'Stock',
				selector: (row) => row.stocks,
				color: 'green',
			},
			{
				name: 'Price',
				selector: (row) => row.cost,
			},
			{
				name: 'Buy',
				selector: (row) => row.buy,
			},
		];

	return (
		<div>
			<DataTable columns={columns} data={data} pagination />
		</div>
	);
};

export default Table;
