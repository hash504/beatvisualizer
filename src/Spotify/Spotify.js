import React, { useState, useCallback, useEffect } from "react";
import { Buffer } from 'buffer';
import axios from 'axios';
import "./Spotify.css"

/*
This entire file is a work in progress. Sometime in the future i will add functionality of searching Spotify via an API request.
*/

const redirectUri = 'http://localhost:3000/';

const Spotify = ({ onSearch, searchTerm }) => {

    const clientId = "CLIENT_ID";
    const clientSecret = "CLIENT_SECRET";

    const [term, setTerm] = useState("");

    const handleTermChange = useCallback((event) => {
        setTerm(event.target.value);
        
    }, [])

    const [token, setToken] = useState(''); 
    const resultsData = {
        title: [],
        artist: [],
        id: [],
        bpm: []
    };

    useEffect(() => { // Token grabber
        axios("https://accounts.spotify.com/api/token", {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            data: 'grant_type=client_credentials'
        })
        .then(tokenResponse => {
            setToken(tokenResponse.data.access_token);
        })
    }, []);

    const searchResults = useCallback(() => { //Sets search results
        onSearch(term);
        const newTerm = term.replace(/ /g, "+");
        setTerm(newTerm);
        getResults();
    }, [onSearch, term]);

    const getResultText = useCallback((i, songTextId, bpmTextId) => { // Helper function for getResults
        return (
            <tr> 
                <td className="text" id={songTextId}>{resultsData.title[i]} - {resultsData.artist[i]}</td>
                <td className="text" id={bpmTextId}>{resultsData.bpm[i]}</td>
            </tr>
        )
    })

    const [results, setResults] = useState();

    const getResults = () => { // Gets search results, then returns JSX table
        setResults('');
        axios(`https://api.spotify.com/v1/search?q=${term}&type=track&limit=5`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
        })
        .then(searchResults => {
            //console.log(searchResults);
            resultsData.title = searchResults.data.tracks.items.map(track => track.name);
            resultsData.id = searchResults.data.tracks.items.map(track => track.id);
            resultsData.artist = searchResults.data.tracks.items.map(track => track.artists[0].name);
            
            axios(`https://api.spotify.com/v1/audio-features?ids=${resultsData.id[0]}%2C${resultsData.id[1]}%2C${resultsData.id[2]}%2C${resultsData.id[3]}%2C${resultsData.id[4]}%2C`, {
                method: 'GET',
                headers: { 'Authorization' : 'Bearer ' + token}
            })
            .then(searchResults => {
                resultsData.bpm = searchResults.data.audio_features.map(track => Math.round(track.tempo).toString());
            })
            .then(() => {
                setResults(
                    <div id="SearchResults">
                        <table id="Table">
                            <thead>
                                <tr>
                                    <th colSpan="2" className="text" id="WarningText">BPM values are approximate.</th>
                                </tr>
                                <tr>
                                    <th className="text" id="SongTextTop">Song Name - Artist</th>
                                    <th className="text" id="BpmTextTop">BPM</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getResultText(0, "SongText", "BpmText")}
                                {getResultText(1, "SongText", "BpmText")}
                                {getResultText(2, "SongText", "BpmText")}
                                {getResultText(3, "SongText", "BpmText")}
                                {getResultText(4, "SongTextBottom", "BpmTextBottom")}
                            </tbody>
                        </table>
                    </div>
                )
            })
            
        }, [])
    }

    

    return (
        <div>
            <div className="SearchBar">
                <h2></h2>
                <input id="SearchBar" className="text" placeholder="Search Spotify..." onChange={handleTermChange}/>
                <button id="SearchButton" onClick={searchResults}></button>
            </div>
            {results}
        </div>
    )
}

export default Spotify;