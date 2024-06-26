// Libraries
import React from "react";
import { useParams } from "react-router-dom";

// Components
import Navbar from "../../Components/Navbar/Navbar";
import SearchPostContent from "../../Components/SearchPostContent/SearchPostContent";

// Styling
import './SearchPage.css'

export default function Search() {
  const { search } = useParams();

  return (
    <main className="search-posts">
      <div className="App">
        <Navbar />
        <SearchPostContent search={search} />
      </div>
    </main>
  );
}
