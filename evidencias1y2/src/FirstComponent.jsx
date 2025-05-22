import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './ProductList';
import StatsPanel from './StatsPanel';

function FirstComponent() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUpdating, actualizaBusqueda] = useState(false);
  const [show, setShow] = useState(true); // State to toggle StatsPanel visibility

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(response => {
        setProducts(response.data.products);
      })
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Esta función es necesaria para simular un retraso en la búsqueda y dar tiempo para que se visualiza la animación
  const campoBusqueda = (e) => {
    actualizaBusqueda(true); // esta variable se usa para indicar que se está actualizando la búsqueda
    setSearchTerm(e.target.value);
    setTimeout(() => actualizaBusqueda(false), 300); // con esto simulamos un retraso para la actualización
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">EV2: Productos - Stats + Grid</h1>
      <input
        type="text"
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={campoBusqueda}
        className="border p-2 mb-4 w-full"
      />
      <button onClick={() => setShow(!show)}>{show?'Ocultar Stats':'Mostrar Stats'}</button>
      {show && (
        <div className={`transition-opacity duration-300 ${isUpdating ? 'opacity-0' : 'opacity-100'}`}>
          <StatsPanel products={filteredProducts} />
        </div>
      )}
      <ProductList products={filteredProducts} />
    </div>
  );
}

export default FirstComponent;