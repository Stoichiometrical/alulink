// import React from 'react';
// import { FaSearch } from 'react-icons/fa';
// import './SearchBar.scss';

// export default function SearchBar({placeholder}) {
//   return (
//     <div className="search-bar">
//       <input type="text" placeholder={placeholder} />
//       <FaSearch className="search-icon" />
//     </div>
//   );
// }

import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.scss';

export default function SearchBar({ placeholder, serverRoute, onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Construct the URL based on the server route and search query
    const url = `http://localhost:3000/${serverRoute}/${encodeURIComponent(searchQuery)}`;

    // Fetch results from the server using the constructed URL
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Pass the fetched data to the parent component or function
        onSearch(data);
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
      });
  };

  const handleChange = (event) => {
    // Update the searchQuery state as the input value changes
    setSearchQuery(event.target.value);
  };

  const handleKeyDown = (event) => {
    // Trigger search on Enter key press
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <FaSearch className="search-icon" onClick={handleSearch} />
    </div>
  );
}
