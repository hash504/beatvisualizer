import React, { useState, useCallback } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
    const [term, setTerm] = useState("");

    const handleTermChange = useCallback((event) => {
        setTerm(event.target.value);
    }, []);

    const search = useCallback(() => {
        onSearch(term);
    }, [onSearch, term]);

    return (
        <div className="SearchBar">
            <input id="SearchBar" className="text" placeholder="Insert YouTube URL..." onChange={handleTermChange}/>
            <button id="AddButton" onClick={search}></button>
        </div>
    )
}

export default SearchBar;