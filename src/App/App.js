import React, { useState, useCallback } from 'react';
import SearchBar from "../SearchBar/SearchBar";
import Spotify from "../Spotify/Spotify";
import VideoPlayer from "../VideoPlayer/VideoPlayer"
import "./App.css"

const App = () => {
    const [url, setUrl] = useState("");
    const [songBpmTerm, setSongBpmTerm] = useState("");


    function search(result) {
        setUrl(result);
    }

    function searchSongBpm(result) {
        setSongBpmTerm(result);
    }


    return (
        <div>
            <h1>Beat Visualizer</h1>
            <div id="AboutText">
                <a href="https://hash504.github.io/beatvisualizer-about/">About Page</a>
            </div>
            <div>
                <SearchBar onSearch={search} />
                <VideoPlayer videoUrl={url} />
                <Spotify onSearch={searchSongBpm} searchTerm={songBpmTerm}/> 
            </div>
        </div>
    );
}

export default App;