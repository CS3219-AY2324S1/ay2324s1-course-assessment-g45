import { useNavigate } from "react-router-dom"
import { useUserContext } from "../hooks/useUserContext"
import { useMatchContext } from '../hooks/useMatchContext';
import NoMatchFoundPopUp from '../components/match/NoMatchFoundPopUp';
import Config from '../Config';
import io from 'socket.io-client';
import { post } from '../apis/MatchingApi';
import { useEffect } from "react";


const baseUrl = Config.Common.MatchingApiBaseUrl;
var socketId = '';
const socket = io.connect(baseUrl); // connect to backend
socket.on('connect', () => {
  socketId = socket.id;
});

const MatchPage = () => {
    const { user, dispatch } = useUserContext()
    const navigate = useNavigate()
    const { state: bannerState, dispatch: bannerDispatch } = useMatchContext();

    const handleShowEasyBanner = () => {
        if (bannerState.showBanner === false) {
            bannerDispatch({ type: 'WAITING_EASY_MATCH' });
        }
    }

    const handleShowMediumBanner = () => {
        if (bannerState.showBanner === false) {
            bannerDispatch({ type: 'WAITING_MEDIUM_MATCH' });
        }
    }

    const handleShowHardBanner = () => {
        if (bannerState.showBanner === false) {
            bannerDispatch({ type: 'WAITING_HARD_MATCH' });
        }
    }

    const handleSubmit = async (complexity) => {
      if (!user) return // user should always be logged in
      if (bannerState.showBanner === false) {
        bannerDispatch({ type: `WAITING_${complexity.toUpperCase()}_MATCH`})
      }
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

    const handleMatch = (msg) => {
      console.log(msg)
      bannerDispatch({ type: 'HIDE_BANNER'})
      navigate(`/codeEditor/${msg._id}`)
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
                            <button className="custom-match-btn easy-btn" onClick={() => handleSubmit('Easy')}><span>
                                <i className="fa-regular fa-star fa-bounce"></i> Easy</span></button>
                            <button className="custom-match-btn medium-btn" onClick={() => handleSubmit('Medium')}><span>
                                <i className="fa-regular fa-star-half-stroke fa-bounce"></i> Medium</span></button>
                            <button className="custom-match-btn hard-btn" onClick={() => handleSubmit('Hard')}><span>
                                <i className="fa-solid fa-star fa-bounce"></i> Hard</span></button>
                        </div>
                    </div>
                </div>
            </div>
            {(bannerState.showModal) &&
                <NoMatchFoundPopUp />
            }
        </div>
    )
}

export default MatchPage