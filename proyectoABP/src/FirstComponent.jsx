import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ProductList from './ProductList';
import StatsPanel from './StatsPanel';
import SearchBar from './SearchBar';

function FirstComponent() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUpdating, actualizaBusqueda] = useState(false);
  const [show, setShow] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [orderDir, setOrderDir] = useState('asc');
  const themeRef = useRef(null); // Referencia para cmaiar el tema

  useEffect(() => {
    axios.get('https://dummyjson.com/products?limit=100')
      .then(response => {
        setProducts(response.data.products);
      });
  }, []);

  // Extract unique categories from products
  const categories = Array.from(new Set(products.map(p => p.category)));

  // Filter by search term and selected category
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === '' || product.category === selectedCategory)
  );

  // Sort filtered products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (orderBy === 'price') {
      return orderDir === 'asc' ? a.price - b.price : b.price - a.price;
    } else if (orderBy === 'rating') {
      return orderDir === 'asc' ? a.rating - b.rating : b.rating - a.rating;
    }
    return 0;
  });

  const handleSearchChange = (e) => {
    actualizaBusqueda(true);
    setSearchTerm(e.target.value);
    setTimeout(() => actualizaBusqueda(false), 300);
  };

  const toggleTheme = () => {
    document.body.classList.toggle('dark');
    if (themeRef.current) {
      themeRef.current.classList.toggle('dark');
    }
  };

  return (
    <div ref={themeRef} className="p-4">
      <h1 className="text-2xl font-bold mb-4">Proyecto ABP</h1>
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <div>
          <label className="mr-2 font-semibold">Filtrar por categoría:</label>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Todas</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mr-2 font-semibold">Ordenar por:</label>
          <select
            value={orderBy}
            onChange={e => setOrderBy(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Ninguno</option>
            <option value="price">Precio</option>
            <option value="rating">Rating</option>
          </select>
          <select
            value={orderDir}
            onChange={e => setOrderDir(e.target.value)}
            className="border p-2 rounded ml-2"
          >
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </div>
      </div>
      <button onClick={() => setShow(!show)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">{show ? 'Ocultar Stats' : 'Mostrar Stats'}</button>
      <button onClick={toggleTheme} className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Toggle Theme</button>
      {show && (
        <div className={`transition-opacity duration-300 ${isUpdating ? 'opacity-0' : 'opacity-100'}`}>
          <StatsPanel products={sortedProducts} />
        </div>
      )}
      <ProductList products={sortedProducts} />
    </div>
  );
}

export default FirstComponent;