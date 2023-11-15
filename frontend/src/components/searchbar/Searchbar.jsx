import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.scss';

export default function SearchBar({placeholder}) {
  return (
    <div className="search-bar">
      <input type="text" placeholder={placeholder} />
      <FaSearch className="search-icon" />
    </div>
  );
}
