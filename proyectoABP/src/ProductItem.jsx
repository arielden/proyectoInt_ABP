import React from 'react';

function ProductItem({ product }) {
  return (
    <div className="border p-4">
      <h2 className="font-bold text-lg">{product.title}</h2>
      <p>Precio: ${product.price}</p>
      <p>Descuento: {product.discountPercentage}%</p>
    </div>
  );
}

export default ProductItem;