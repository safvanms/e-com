import React, { useState } from 'react';
import './header.css';

export default function Header({ handleSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchClick = () => {
    handleSearch(searchQuery);
  };
  return (
    <div className="header">
      <h1>iCart</h1>
      <div className="header__search__sec">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
        />
        <div onClick={handleSearchClick}>Search</div>
      </div>
    </div>
  );
}
