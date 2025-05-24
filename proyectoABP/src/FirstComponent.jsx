import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './ProductList';
import StatsPanel from './StatsPanel';
import SearchBar from './SearchBar';

function FirstComponent() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUpdating, actualizaBusqueda] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    axios.get('https://dummyjson.com/products?limit=100')
      .then(response => {
        setProducts(response.data.products);
      });
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    actualizaBusqueda(true);
    setSearchTerm(e.target.value);
    setTimeout(() => actualizaBusqueda(false), 300);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Proyecto ABP</h1>
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <button onClick={() => setShow(!show)}>{show ? 'Ocultar Stats' : 'Mostrar Stats'}</button>
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