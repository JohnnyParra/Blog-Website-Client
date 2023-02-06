import React from 'react'
import Dropdown from '../Dropdown/Dropdown'
import SearchBar from '../SearchBar/SearchBar'


import './Navbar.css'

export default function Navbar(props) {
  return(
    <div className="header">
      <nav>
        <h1>Blog</h1>
        <div className="right">
          <SearchBar />
          <Dropdown name={props.name} />
        </div>
      </nav>
    </div>
  )
}
