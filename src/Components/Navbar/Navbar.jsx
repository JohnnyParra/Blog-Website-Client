//Libraries
import React from 'react';

// Components
import Dropdown from '../Dropdown/Dropdown';
import SearchBar from '../SearchBar/SearchBar';

// Styling
import './Navbar.css';

export default React.memo(function Navbar(props) {
  return (
    <div className='header'>
      <nav>
        <h1>Blog</h1>
        <div className='right'>
          <SearchBar />
          <Dropdown />
        </div>
      </nav>
    </div>
  );
});
