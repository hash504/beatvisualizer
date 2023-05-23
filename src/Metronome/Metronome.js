import React, { useState, useCallback, useRef } from "react";
import useSound from "use-sound";
import "./Metronome.css";
import metronomeSfx from "./metronome-sfx.mp3";
import metronomeFirstBeatSfx from "./metronome-sfx-firstbeat.mp3";


const Metronome = ({ initialBpm, initialStartPoint, playback }) => {
    
    const [bpm, setBpm] = useState(120);
    const [startPoint, setStartPoint] = useState(0);
    const [metronome, setMetronome] = useState(0);
    const [playSfx] = useSound(metronomeSfx, {volume: 0.5});
    const [playFirstBeatSfx] = useSound(metronomeFirstBeatSfx, {volume: 0.5});


    const handleBpmChange = useCallback((event) => {
        setBpm(event.target.value);
    });

    const submitBpmChange = useCallback(() => {
        initialBpm(bpm);
    }, [initialBpm, bpm]);

    const handleStartPointChange = useCallback((event) => {
        setStartPoint(event.target.value);
    });

    const submitStartPointChange = useCallback(() => {
        initialStartPoint(startPoint);
    }, [initialStartPoint, startPoint]);

    let metronomeIndex = 1;
    const interval = 60000 / bpm;
    const metronomeInterval = useRef(null);
    
    function startMetronome() {
        playback(true);    

        setMetronome(1);
        playFirstBeatSfx();
        metronomeInterval.current = setInterval(() => {
            if (metronomeIndex >= 4) {
                metronomeIndex = 0;
            }
            metronomeIndex++;
            setMetronome(metronomeIndex);

            if (metronomeIndex === 1) {
                playFirstBeatSfx();
            }
            else {
                playSfx();
            }
        }, interval)

    };

    const stopMetronome = () => {
        playback(false);
        clearInterval(metronomeInterval.current);
        metronomeInterval.current = null;
        setMetronome(0);
    }




    return (
        <div>
            <div className="ControlButtons">
                <button id="PlayButton" onClick={startMetronome}/><button id="StopButton" onClick={stopMetronome}/>
            </div>
            <div className={"metronome" + metronome} />
            <div className='settings'>
                <div className='settingbars'>
                    <input id="settings" type="number" step="any" className="text" placeholder='Insert BPM...' onChange={handleBpmChange}/><button className="text" id="settingbutton" onClick={submitBpmChange}>Set</button>
                </div>
                <div className='settingbars'>
                    <input id="settings" type="number" step="any" className="text" placeholder='Insert Start Point (Sec.)...' onChange={handleStartPointChange}/><button className="text" id="settingbutton" onClick={submitStartPointChange}>Set</button>
                </div>
            </div>
        </div>
    );
}

export default Metronome;