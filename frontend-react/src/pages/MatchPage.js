import { useNavigate } from "react-router-dom"
import React, { useEffect, useState } from 'react';
import { useUserContext } from "../hooks/useUserContext"
import { useMatchContext } from '../hooks/useMatchContext';
import NoMatchFoundPopUp from '../components/match/NoMatchFoundPopUp';
import Config from '../Config';
import io from 'socket.io-client';
import { post } from '../apis/MatchingApi';
import { createSession } from "../apis/CollabSessionApi";

const baseUrl = Config.Common.MatchingApiBaseUrl;
var socketId = '';
const socket = io.connect(baseUrl); // connect to backend
socket.on('connect', () => {
  console.log("Matching page frontend socketid: "+ socket.id)
  socketId = socket.id;
});

const MatchPage = () => {
    const { user, dispatch } = useUserContext()
    const navigate = useNavigate()
    const { state: bannerState, dispatch: bannerDispatch } = useMatchContext();
    const [complexity, setComplexity] = useState('')

    const handleSubmit = async (complexity) => {
      console.log('submitting match request')
      if (!user) return // user should always be logged in
      if (bannerState.showBanner === false) {
        bannerDispatch({ type: `WAITING_${complexity.toUpperCase()}_MATCH`})
      }
      setComplexity(complexity)
      const response = await post({
        complexity,
        time: Date.now(),
        socketId,
        uid: user.id,
        username: user.username,
      });
      const json = response.json();
      if (!response.ok) {
        console.log(json);  
      }
    }

    const handleMatch = async (msg) => {
      console.log("Handle match!!")
      console.log(msg)
      // bannerDispatch({ type: 'HIDE_BANNER'})
      // navigate(`/codeEditor/${msg._id}`)
      const response = await createSession(msg)
      const json = await response.json()
      console.log(json)
      if (response.ok) {
        bannerDispatch({ type: 'HIDE_BANNER'})
        navigate(`/codeEditor/${json._id}`)
      }
    }

    useEffect(() => {
        socket.on('matching', handleMatch);
        return () => {
            socket.off('matching', handleMatch)
        }
    }, [])

    return (
        <div>
            <div className="col-lg-4 offset-lg-4 grid-margin stretch-card mt-5">
                <div className="card">
                    <div className="card-body">
                        <div className='card-title'>
                            <div className="match-wrapper">
                                <div className="match-gradient-div">
                                    <i className="fa-solid fa-code-compare fa-xl"></i>
                                </div>
                                <span className="match-text">Quick Match</span>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
                            <button className="custom-match-btn easy-btn"  disabled={bannerState.disableButtons} onClick={() => handleSubmit('Easy')}><span>
                                <i className="fa-regular fa-star fa-bounce"></i> Easy</span></button>
                            <button className="custom-match-btn medium-btn"  disabled={bannerState.disableButtons} onClick={() => handleSubmit('Medium')}><span>
                                <i className="fa-regular fa-star-half-stroke fa-bounce"></i> Medium</span></button>
                            <button className="custom-match-btn hard-btn"  disabled={bannerState.disableButtons} onClick={() => handleSubmit('Hard')}><span>
                                <i className="fa-solid fa-star fa-bounce"></i> Hard</span></button>
                        </div>
                    </div>
                </div>
            </div>
            {(bannerState.showModal) &&
                <NoMatchFoundPopUp
                    handleSubmit={handleSubmit}
                    complexity={complexity}
                />
            }
        </div>
    )
}

export default MatchPage