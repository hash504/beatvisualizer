import React, { useState, useRef } from "react";
import ReactPlayer from 'react-player';
import "./VideoPlayer.css";
import Metronome from "../Metronome/Metronome"

const VideoPlayer = ({ videoUrl }) => {

    const [bpm, setBpm] = useState(120);
    const [delay, setDelay] = useState();
    const playerRef = useRef(null);
    var [playback, setPlayback] = useState(false);

    function changeBpm(result) {
        setBpm(result);
    }

    function changeDelay(result) {
        setDelay(result);
    }
    
    function handlePlayback(result) {
        setPlayback(result);
        playerRef.current.seekTo(0);
    }

    function isReady() {
        setPlayback(true);
        
    }

    function setTimeToZero() { 
        setPlayback(false);
        playerRef.current.seekTo(0);
    }

    // Previously, the metronome would start before the video loaded, and i couldn't find a way to delay the start of the metronome until the video started
    // Instead, i used onReady and onStart to play the video (which loads it), then immediately stop it, then set it back to the beginning via playerRef.current.seekTo(0)
    // I spent almost a week trying to deal with this singular issue so i don't really care how convoluted this solution is

    return (
        <div id="VideoControls">
            <ReactPlayer
                ref={playerRef}
                controls
                width="900px" height="540px"
                style={{backgroundColor: "black"}}
                url={videoUrl}
                onReady={isReady}
                onStart={setTimeToZero}
                muted={!playback}
                volume={0.5}
                playing={playback}
            />
            <div>
                <Metronome initialBpm={changeBpm} initialDelay={changeDelay} playback={handlePlayback} />
            </div>
            
        </div>
        
    )
}

export default VideoPlayer;