import React from 'react';

interface ProductItemProps {
  product: {
    _id: string;
    productName: string;
    productPrice: number;
    productStock: number;
  };
  onDelete: () => void;
  onEdit: () => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onDelete, onEdit }) => {
  return (
    <div className="product-item">
      <h2 className="product-name">{product.productName}</h2>
      <p className="product-description">{product.productStock}</p>
      <p className="product-price">${product.productPrice}</p>
      <div className="button-group">
        <button className="button edit-button" onClick={onEdit}>Edit</button>
        <button className="button delete-button" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default ProductItem;
