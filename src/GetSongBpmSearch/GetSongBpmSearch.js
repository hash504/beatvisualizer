import React, { useState, useCallback } from "react";
import "./GetSongBpmSearch.css"

/*
This entire file is a work in progress. Sometime in the future i will add functionality of searching getsongbpm.com via an API request.
*/

const GetSongBpmSearch = ({ onSearch, searchTerm }) => {

    const [term, setTerm] = useState("");

    const api_key = "bd284b3121a7f07d78c6801c589e85f2"

    const exampleResult = {
        title: "Example Song",
        artist: "Example Artist",
        tempo: 120
    }

    const handleTermChange = useCallback((event) => {
        setTerm(event.target.value);
        
    }, [])

    const searchResults = useCallback(() => {
        onSearch(term);
        const newTerm = term.replace(/ /g, "+");
        setTerm(newTerm);
        getResults();
    }, [onSearch, term]);

    const getResults = async () => {
        
        const endpoint = `https://api.getsongbpm.com/search/?api_key=${api_key}&type=both&lookup=${term}`

        try {
            const response = await fetch(endpoint, {cache: 'no-cache'});
            if (response.ok) {
                const jsonResponse = await response.json();
                console.log(jsonResponse);
                return jsonResponse;
            }
        } catch(error) {
            console.log(error);
        }
        
    }

    const results = (
        <table id="Table">
            <thead>
                <tr>
                    <th className="text" id="SongText">Song Name - Artist</th>
                    <th className="text" id="BpmText">BPM</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="text" id="SongText">{exampleResult.title} - {exampleResult.artist}</td>
                    <td className="text" id="BpmText">{exampleResult.tempo}</td>
                </tr>
                <tr>
                    <td className="text" id="SongTextBottom">{exampleResult.title} - {exampleResult.artist}</td>
                    <td className="text" id="BpmTextBottom">{exampleResult.tempo}</td>
                </tr>
            </tbody>
        </table>
    )

        

    return (
        <div>
            <div className="SearchBar">
                <h2></h2>
                <input id="SearchBar" className="text" placeholder="Search getsongbpm.com..." onChange={handleTermChange}/>
                <button id="SearchButton" onClick={searchResults}></button>
            </div>
            <div id="SearchResults">
                <div id="text">Work in progress.</div>
            </div>
            
        </div>
    )
}

export default GetSongBpmSearch;