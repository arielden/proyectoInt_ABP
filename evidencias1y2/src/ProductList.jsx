import React from 'react';

function ProductList({ products }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map(product => (
        <div key={product.id} className="border p-4 m-2 bg-gray-800 text-white rounded-md shadow-md transition-transform transform hover:scale-105">
          <h2 className="text-lg font-semibold">{product.title}</h2>
          <p className="text-gray-300">Precio: ${product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;