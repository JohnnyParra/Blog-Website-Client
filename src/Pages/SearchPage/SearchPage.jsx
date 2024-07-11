// Libraries
import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from 'react-helmet';

// Components
import Navbar from "../../Components/Navbar/Navbar";
import SearchPostContent from "../../Components/SearchPostContent/SearchPostContent";

// Styling
import './SearchPage.css'

export default function Search() {
  const { search } = useParams();

  return (
    <main className="search-posts">
      <Helmet>
        <title>{`${search} search results | Project B`}</title>
        <meta name='description' content={`This is our page displaying the search results of ${search}`} />
        <meta name='keywords' content={`${search}, search, lookup, find, page, website`} />
      </Helmet>
      <div className="App">
        <Navbar />
        <SearchPostContent search={search} />
      </div>
    </main>
  );
}
