import React from 'react';

function StatsPanel({ products }) {
  if (!products || products.length === 0) return <p>No se encontraron productos</p>;

  // Precio promedio
  const avgPrice = (products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2);

  // Precio máximo y mínimo
  const maxPrice = products.reduce((max, p) => p.price > max ? p.price : max, products[0].price);
  const minPrice = products.reduce((min, p) => p.price < min ? p.price : min, products[0].price);

  // Cantidad de productos por categoría seleccionada el array ya viene filtrado desde FirstComponent
  const qtyByCategory = products.length;

  // Cantidad de productos con stock y ratings altos
  const qtyStockRating = products.filter(p => p.stock > 50 && p.rating > 4.5).length;

  const categoryStats = products.reduce((acc, p) => {
    if (!acc[p.category]) {
      acc[p.category] = {
        products: [],
        totalPrice: 0,
        totalRating: 0,
      };
    }
    acc[p.category].products.push(p);
    acc[p.category].totalPrice += p.price;
    acc[p.category].totalRating += p.rating;
    return acc;
  }, {});

  const categories = Object.keys(categoryStats);

  return (
    <div className="p-4 border m-2 bg-blue-900 text-white rounded-md transition-all duration-300">
      <h2 className="text-xl font-bold mb-2">Estadísticas:</h2>
      <div className="space-y-2">
        <p className="bg-blue-800 p-2 rounded-md shadow-sm"><strong>Precio Promedio:</strong> ${avgPrice}</p>
        <p className="bg-blue-800 p-2 rounded-md shadow-sm"><strong>Precio Máximo:</strong> ${maxPrice}</p>
        <p className="bg-blue-800 p-2 rounded-md shadow-sm"><strong>Precio Mínimo:</strong> ${minPrice}</p>
        <p className="bg-blue-800 p-2 rounded-md shadow-sm"><strong>Cantidad de productos en la categoría seleccionada:</strong> {qtyByCategory}</p>
        <p className="bg-blue-800 p-2 rounded-md shadow-sm"><strong>Cantidad de productos con stock &gt; 50 y rating &gt; 4.5:</strong> {qtyStockRating}</p>
        <div className="bg-blue-800 p-2 rounded-md shadow-sm">
          <strong>Precio promedio por categoría:</strong>
          <ul className="ml-4">
            {categories.map(cat => (
              <li key={cat}>{cat}: ${(categoryStats[cat].totalPrice / categoryStats[cat].products.length).toFixed(2)}</li>
            ))}
          </ul>
        </div>
        <div className="bg-blue-800 p-2 rounded-md shadow-sm">
          <strong>Producto más barato por categoría:</strong>
          <ul className="ml-4">
            {categories.map(cat => {
              const cheapest = categoryStats[cat].products.reduce((min, p) => p.price < min.price ? p : min, categoryStats[cat].products[0]);
              return <li key={cat}>{cat}: {cheapest.title} (${cheapest.price})</li>;
            })}
          </ul>
        </div>
        <div className="bg-blue-800 p-2 rounded-md shadow-sm">
          <strong>Producto más caro por categoría:</strong>
          <ul className="ml-4">
            {categories.map(cat => {
              const expensive = categoryStats[cat].products.reduce((max, p) => p.price > max.price ? p : max, categoryStats[cat].products[0]);
              return <li key={cat}>{cat}: {expensive.title} (${expensive.price})</li>;
            })}
          </ul>
        </div>
        <div className="bg-blue-800 p-2 rounded-md shadow-sm">
          <strong>Rating promedio por categoría:</strong>
          <ul className="ml-4">
            {categories.map(cat => (
              <li key={cat}>{cat}: {(categoryStats[cat].totalRating / categoryStats[cat].products.length).toFixed(2)}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default StatsPanel;