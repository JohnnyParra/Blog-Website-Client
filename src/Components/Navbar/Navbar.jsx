//Libraries
import React from 'react';
import { Link } from "react-router-dom";

// Components
import Dropdown from '../Dropdown/Dropdown';
import SearchBar from '../SearchBar/SearchBar';

// Styling
import './Navbar.css';

export default React.memo(function Navbar(props) {
  return (
    <div className='header'>
      <nav aria-label='Main Navigation'>
        <h2 className="title"><Link to="/">Fire Talks</Link></h2>
        <div className='right'>
          <SearchBar />
          <Dropdown />
        </div>
      </nav>
    </div>
  );
});
