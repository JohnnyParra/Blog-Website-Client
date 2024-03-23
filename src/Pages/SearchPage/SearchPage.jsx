// Libraries
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

// Api Services
import { fetchSearch } from "../../ApiServices/TasksService";

// Components
import Navbar from "../../Components/Navbar/Navbar";
import PostCard from "../../Components/PostCard/PostCard"

// Styling
import './SearchPage.css'

export default function Search() {
  const { search } = useParams();

  const {data: searchData, isLoading, isError,} = useQuery(
    ["search", search], 
    () => fetchSearch(search), 
    {
    refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return (
      <main className="search-posts">
        <div className="App">
          <Navbar />
          <p>Loading...</p>
        </div>
      </main>
    );
  }

  if (isError) {
    return <p>An Error occurred</p>;
  }

  const searchElements = searchData.posts.map((post) => {
    return (
      <div key={post.id} className="post-card-container">
        <PostCard post={post} />
      </div>
    );
  });

  return (
    <main className="search-posts">
      <div className="App">
        <Navbar />
        {searchElements.length !== 0 ? searchElements: "No Matching Results"}
      </div>
    </main>
  );
}
