import React, { useState, useCallback, useRef } from "react";
import useSound from "use-sound";
import "./Metronome.css";
import metronomeSfx from "./metronome-sfx.mp3";
import metronomeFirstBeatSfx from "./metronome-sfx-firstbeat.mp3";


const Metronome = ({ initialBpm, initialDelay, playback }) => {
    
    const [bpm, setBpm] = useState(120);
    const [delay, setDelay] = useState();
    const [metronome, setMetronome] = useState(0);
    const [playSfx] = useSound(metronomeSfx, {volume: 0.5});
    const [playFirstBeatSfx] = useSound(metronomeFirstBeatSfx, {volume: 0.5});


    const handleBpmChange = useCallback((event) => {
        setBpm(event.target.value);
    });

    const submitBpmChange = useCallback(() => {
        initialBpm(bpm);
    }, [initialBpm, bpm]);

    const handleDelayChange = useCallback((event) => {
        setDelay(event.target.value);
    });

    const submitDelayChange = useCallback(() => {
        initialDelay(delay);
    }, [initialDelay, delay]);

    let metronomeIndex = 1;
    const interval = 60000 / bpm;
    const delayInterval = useRef(null);
    const metronomeInterval = useRef(null);
    

    function startMetronome() {
        playback(true);    
        setTimeout(() => {
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
        }, delay);


    };

    const stopMetronome = () => {
        playback(false);
        clearTimeout(delayInterval.current);
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
                    <input id="settings" type="number" className="text" placeholder='Insert BPM...' onChange={handleBpmChange}/><button className="text" id="settingbutton" onClick={submitBpmChange}>Set</button>
                </div>
                <div className='settingbars'>
                    <input id="settings" type="number" className="text" placeholder='Insert delay (MS)...' onChange={handleDelayChange}/><button className="text" id="settingbutton" onClick={submitDelayChange}>Set</button>
                </div>
            </div>
            {/* In the future, i might add functionality for getting information from the getsongbpm.com API, the component for it will be here. */}
        </div>
    );
}

export default Metronome;