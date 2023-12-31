import React, { useState } from 'react';
import './SearchBar.css';
import { useHistory } from "react-router-dom"

function SearchBar() {
  const [query, setQuery] = useState('');
  const history = useHistory();

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  
    if(!query){
      return
    }
    setQuery('')
   history.push(`/searchresults/${query}`)
//    history.push('/watch/search');
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for watch by brand "
        value={query}
        onChange={handleInputChange}
        className="search-input"
      />
      <button type="submit" className="search-button">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  );
}

export default SearchBar;