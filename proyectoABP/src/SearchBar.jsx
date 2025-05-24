import React from 'react';

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <input
      type="text"
      placeholder="Buscar productos..."
      value={searchTerm}
      onChange={onSearchChange}
      className="border p-2 mb-4 w-full"
    />
  );
}

export default SearchBar;