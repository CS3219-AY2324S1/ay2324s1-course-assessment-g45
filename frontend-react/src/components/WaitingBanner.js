import React, { useState, useEffect } from 'react';
import { useWaitingBanner } from '../hooks/useWaitingBanner';

function WaitingBanner() {
    const [counter, setCounter] = useState(0);
    const { state:bannerState, dispatch: bannerDispatch } = useWaitingBanner();

    useEffect(() => {
        const timer = setInterval(() => {
            setCounter((prevCounter) => prevCounter + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const minutes = Math.floor(counter / 60);
    const seconds = counter % 60;

    const handleCancel = () => {
        bannerDispatch({ type: 'HIDE_BANNER' }); // Assuming you've set up this action in your reducer
    };

    return (
        <div className={`waiting-banner ${bannerState.showBanner}`}>
            <div className="banner-content">
                <span className="loading-text">Matching</span>
                <span className="timer">{minutes}m {seconds}s</span> 
            </div>
            <button className="close-button" onClick={handleCancel}>X</button>

        </div>
    );
}

export default WaitingBanner;
