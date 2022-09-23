import React from 'react';

const CartTable = ({data, handleClick, handlePrice}) => {
	return (
		<div>
			<table class="overflow-hidden min-w-full">
						<thead class="border-b">
							<tr>
								<th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-center">
									Product
								</th>
								<th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
									Price
								</th>
								<th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
									Quantity
								</th>
								<th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
									Subtotal
								</th>
							</tr>
						</thead>
						<tbody>
							{
								data.map((item) => (
									<tr class="border-b" key= {item.id}>
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
											<div className="flex justify-center items-center">
												<img src={item.image} className="w-20 mx-2" alt={item.title} />
												<p>{item.title}</p>
											</div>
										</td>
										<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
										${item.price}
										</td>
										<td>
											<div className="border rounded-2xl p-1 flex justify-between items-center">
												<button type="button" className="w-8 border rounded-2xl h-8 text-xl text-center p-auto" id={item.id} onClick = { () => {handleClick(item, 1)}} >&#43;</button>
												<p>{item.quantity}</p>
												<button type="button" className="w-8 border rounded-2xl h-8 text-xl text-center p-auto" onClick = { () => {handleClick(item, -1)} } >&#8722;</button>
											</div>
										</td>
										<td className="text-center">${item.quantity * item.price}</td>
									</tr>
								))
							}
						</tbody>
					</table>
		</div>
	)
}

export default CartTable;
