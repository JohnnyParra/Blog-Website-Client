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
      <nav>
        <h1 className="title"><Link to="/HomePage">Blog</Link></h1>
        <div className='right'>
          <SearchBar />
          <Dropdown />
        </div>
      </nav>
    </div>
  );
});
