import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ProductList from './ProductList';
import StatsPanel from './StatsPanel';
import SearchBar from './SearchBar';
import Graphics from './Graphics';

function FirstComponent() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUpdating, actualizaBusqueda] = useState(false);
  const [show, setShow] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [orderDir, setOrderDir] = useState('asc');
  const [page, setPage] = useState(1);
  const limit = 10;
  const themeRef = useRef(null); // Referencia para cmaiar el tema

  useEffect(() => {
    axios.get('https://dummyjson.com/products?limit=100')
      .then(response => {
        setProducts(response.data.products);
      });
  }, []);

  const categories = Array.from(new Set(products.map(p => p.category)));

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === '' || product.category === selectedCategory)
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (orderBy === 'price') {
      return orderDir === 'asc' ? a.price - b.price : b.price - a.price;
    } else if (orderBy === 'rating') {
      return orderDir === 'asc' ? a.rating - b.rating : b.rating - a.rating;
    }
    return 0;
  });

  // Reset page to 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [searchTerm, selectedCategory, orderBy, orderDir]);

  const totalPages = Math.ceil(sortedProducts.length / limit);
  const paginatedProducts = sortedProducts.slice((page - 1) * limit, page * limit);

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

  // Export functionality
  const triggerDownload = (url, filename) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(sortedProducts, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    triggerDownload(url, "productos.json");
  };

  const handleExportCSV = () => {
    if (!sortedProducts.length) return;
    const header = Object.keys(sortedProducts[0]).join(",");
    const rows = sortedProducts.map(obj => Object.values(obj).map(val => `"${String(val).replace(/"/g, '""')}"`).join(",")).join("\n");
    const csv = `${header}\n${rows}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    triggerDownload(url, "productos.csv");
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
      <div className="bg-blue-900 text-white rounded-md transition-all duration-300 p-4 mt-4">
        <Graphics products={sortedProducts} />
      </div>
      <div className="flex gap-2 my-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 disabled:opacity-50"
        >
          Página anterior
        </button>
        <span className="px-2">Página {page} de {totalPages}</span>
        <button
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage(page + 1)}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 disabled:opacity-50"
        >
          Página siguiente
        </button>
      </div>
      <ProductList products={paginatedProducts} />
      <div className="flex gap-2 my-4">
        <button onClick={handleExportJSON} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Exportar JSON</button>
        <button onClick={handleExportCSV} className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700">Exportar CSV</button>
      </div>
    </div>
  );
}

export default FirstComponent;