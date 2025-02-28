import { useState } from 'react';

const ProductItem = ({ product, onDelete, onUpdate }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [newName, setNewName] = useState(product.name);
	const [newDesc, setNewDesc] = useState(product.description);

	// Handle Save
	const handleSave = () => {
		onUpdate(product.id, newName, newDesc);
		setIsEditing(false);
	};

	return (
		<div
			className="card text-center shadow-sm"
			style={{ width: '75%', padding: '10px' }}
		>
			<img
				src="https://placehold.co/33x33"
				alt={product.name}
				className="card-img-top mx-auto mt-2"
				style={{ width: '80px', height: '80px', cursor: 'pointer' }}
				onClick={() => setIsEditing(true)}
			/>
			<div className="card-body p-2">
				{isEditing ? (
					<>
						<input
							type="text"
							className="form-control mb-1"
							value={newName}
							onChange={(e) => setNewName(e.target.value)}
						/>
						<textarea
							className="form-control mb-2"
							value={newDesc}
							onChange={(e) => setNewDesc(e.target.value)}
						></textarea>
						<button
							className="btn btn-sm btn-success me-1"
							onClick={handleSave}
						>
							Save
						</button>
						<button
							className="btn btn-sm btn-secondary"
							onClick={() => setIsEditing(false)}
						>
							Cancel
						</button>
					</>
				) : (
					<>
						<h6 className="card-title mb-1">{product.name}</h6>
						<p className="card-text text-muted small mb-2">
							{product.description}
						</p>
						<button
							className="btn btn-sm btn-danger"
							onClick={() => onDelete(product.id)}
						>
							Delete
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default ProductItem;
