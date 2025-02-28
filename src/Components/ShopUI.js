import { useState } from 'react';
import ProductItem from './ProductItem';
import 'bootstrap/dist/css/bootstrap.min.css';

const ShopUI = () => {
	const [items, setItems] = useState([
		{ id: 1, name: 'Apple', description: 'Fresh and juicy' },
		{ id: 2, name: 'Pasta', description: 'Delicious Italian pasta' },
		{ id: 3, name: 'Orange', description: 'Rich in vitamin C' },
		{ id: 4, name: 'Mango', description: 'Sweet and tropical' },
		{ id: 5, name: 'Banana', description: 'High in potassium' },
		{ id: 6, name: 'Tomato', description: 'Perfect for salads' },
		{ id: 7, name: 'Carrot', description: 'Good for eyesight' },
		{ id: 8, name: 'Potato', description: 'Great for fries' },
		{ id: 9, name: 'Grapes', description: 'Sweet and refreshing' },
	]);

	const [searchTerm, setSearchTerm] = useState('');
	const [newName, setNewName] = useState('');
	const [newDesc, setNewDesc] = useState('');
	const [showModal, setShowModal] = useState(false);

	// Delete Product
	const deleteProduct = (id) => {
		setItems(items.filter((item) => item.id !== id));
	};

	// Update Product
	const updateProduct = (id, newName, newDesc) => {
		setItems(
			items.map((item) =>
				item.id === id
					? { ...item, name: newName, description: newDesc }
					: item
			)
		);
	};

	// Add Product
	const addProduct = () => {
		if (items.length >= 9) {
			alert('You cannot add more than 9 products.');
			return;
		}
		if (!newName.trim() || !newDesc.trim()) {
			alert('Both fields are required.');
			return;
		}

		const newProduct = {
			id: Date.now(),
			name: newName,
			description: newDesc,
		};

		setItems([...items, newProduct]);
		setShowModal(false);
		setNewName('');
		setNewDesc('');
	};

	// Filter products based on search term
	const filteredItems = items.filter((item) =>
		item.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	// Divide items into rows of 3
	const rows = [];
	for (let i = 0; i < filteredItems.length; i += 3) {
		rows.push(filteredItems.slice(i, i + 3));
	}

	return (
		<div className="container mt-4 d-flex flex-column align-items-center">
			{/* Search Filter */}
			<input
				type="text"
				className="form-control w-50 mb-3"
				placeholder="Search product..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>

			{/* Product Grid */}
			<div className="container">
				<div className="row justify-content-center">
					{rows.map((itemList, rowIdx) => (
						<div
							className="row mb-3 w-100 justify-content-center"
							key={rowIdx}
						>
							{itemList.map((item) => (
								<div
									className="col-md-4 d-flex justify-content-center"
									key={item.id}
								>
									<ProductItem
										product={item}
										onDelete={deleteProduct}
										onUpdate={updateProduct}
									/>
								</div>
							))}
						</div>
					))}
				</div>
			</div>

			{/* Add Product Modal */}
			{showModal && (
				<div
					className="modal fade show d-block"
					style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
				>
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Add Product</h5>
								<button
									className="btn-close"
									onClick={() => setShowModal(false)}
								></button>
							</div>
							<div className="modal-body">
								<input
									type="text"
									className="form-control mb-2"
									placeholder="Product Name"
									value={newName}
									onChange={(e) => setNewName(e.target.value)}
								/>
								<textarea
									className="form-control mb-2"
									placeholder="Description"
									value={newDesc}
									onChange={(e) => setNewDesc(e.target.value)}
								></textarea>
							</div>
							<div className="modal-footer">
								<button
									className="btn btn-secondary"
									onClick={() => setShowModal(false)}
								>
									Close
								</button>
								<button
									className="btn btn-success"
									onClick={addProduct}
								>
									Add Product
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Add Product Button */}
			<button
				className="btn btn-primary mb-3"
				onClick={() => setShowModal(true)}
			>
				Add Product
			</button>
		</div>
	);
};

export default ShopUI;
