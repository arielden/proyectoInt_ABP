import React from 'react';

function StatsPanel({ products }) {
  if (!products || products.length === 0) return <p>No se encontraron productos</p>;

  const masCaro = products.find(product => product.price === Math.max(...products.map(product => product.price)));
  const masBarato = products.find(product => product.price === Math.min(...products.map(product => product.price)));
  const tituloLargo = products.filter(product => product.title.length > 20).length;
  const promDescuento = (products.reduce((sum, product) => sum + product.discountPercentage, 0) / products.length).toFixed(2);
  const qtyProductos = products.length;
  const promPrecio = (products.reduce((sum, product) => sum + product.price, 0) / products.length).toFixed(2);
  const mayorDescuento = products.reduce((prev, current) => (prev.discountPercentage > current.discountPercentage ? prev : current));
  const menorDescuento = products.reduce((prev, current) => (prev.discountPercentage < current.discountPercentage ? prev : current));
  const rangoPrecio = {
    min: Math.min(...products.map(product => product.price)),
    max: Math.max(...products.map(product => product.price))
  };

  return (
    <div className="p-4 border m-2 bg-blue-900 text-white rounded-md transition-all duration-300">
      <h2 className="text-xl font-bold mb-2">Estadísticas:</h2>
      <div className="space-y-2">
        <p className="bg-blue-800 p-2 rounded-md shadow-sm"><strong>Total de Productos:</strong> {qtyProductos}</p>
        <p className="bg-blue-800 p-2 rounded-md shadow-sm"><strong>Precio Promedio:</strong> ${promPrecio}</p>
        <p className="bg-blue-800 p-2 rounded-md shadow-sm"><strong>Más Caro:</strong> {masCaro.title} (${masCaro.price})</p>
        <p className="bg-blue-800 p-2 rounded-md shadow-sm"><strong>Más Barato:</strong> {masBarato.title} (${masBarato.price})</p>
        <p className="bg-blue-800 p-2 rounded-md shadow-sm"><strong>Productos con títulos mayor 20chr:</strong> {tituloLargo}</p>
        <p className="bg-blue-800 p-2 rounded-md shadow-sm"><strong>Descuento Promedio:</strong> {promDescuento}%</p>
        <p className="bg-blue-800 p-2 rounded-md shadow-sm"><strong>Mayor Descuento:</strong> {mayorDescuento.title} ({mayorDescuento.discountPercentage}%)</p>
        <p className="bg-blue-800 p-2 rounded-md shadow-sm"><strong>Menor Descuento:</strong> {menorDescuento.title} ({menorDescuento.discountPercentage}%)</p>
        <p className="bg-blue-800 p-2 rounded-md shadow-sm"><strong>Rango de Precios:</strong> ${rangoPrecio.min} - ${rangoPrecio.max}</p>
      </div>
    </div>
  );
}

export default StatsPanel;