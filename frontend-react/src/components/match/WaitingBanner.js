import React, { useState, useEffect } from 'react';
import { cancel } from '../../apis/MatchingApi';
import { useUserContext } from '../../hooks/useUserContext';
import { useMatchContext } from '../../hooks/useMatchContext';

function WaitingBanner() {
  const { user, dispatch } = useUserContext();
  const [counter, setCounter] = useState(0);
  const { state: bannerState, dispatch: bannerDispatch } = useMatchContext();
  const waitingTime = 30; /* wait 2 minutes before the not match found banner pops up, can adjust lower to test */

  useEffect(() => {
    setCounter(0);
    const timer = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (counter === waitingTime) {
      bannerDispatch({ type: 'NO_MATCH_FOUND' });
    }
  }, [counter]);

  const minutes = Math.floor(counter / 60);
  const seconds = counter % 60;

  const handleCancel = async () => {
    if (!user) return; // user should always be logged in

    const response = await cancel({
      uid: user.id,
      username: user.username,
    });
    const json = response.json();
    if (!response.ok) {
      console.log(json);
    }

    bannerDispatch({ type: 'HIDE_BANNER' });
  };

  return (
    <div className={`waiting-banner ${bannerState.showBanner}`}>
      <div className="banner-content">
        <span className="loading-text">Matching</span>
        <span className="timer">
          {minutes}m {seconds}s
        </span>
      </div>
      <button className="close-button" onClick={handleCancel}>
        X
      </button>
    </div>
  );
}

export default WaitingBanner;
