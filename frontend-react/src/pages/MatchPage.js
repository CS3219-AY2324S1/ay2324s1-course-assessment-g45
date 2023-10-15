import { useNavigate } from "react-router-dom"
import { useUserContext } from "../hooks/useUserContext"
import { useMatchContext } from '../hooks/useMatchContext';
import NoMatchFoundPopUp from '../components/match/NoMatchFoundPopUp';

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
                        <div className="d-flex justify-content-between align-items-center mb-5 mt-2">
                            <button className="custom-match-btn easy-btn" onClick={handleShowEasyBanner}><span>
                                <i className="fa-regular fa-star fa-bounce"></i> Easy</span></button>
                            <button className="custom-match-btn medium-btn" onClick={handleShowMediumBanner}><span>
                                <i className="fa-regular fa-star-half-stroke fa-bounce"></i> Medium</span></button>
                            <button className="custom-match-btn hard-btn" onClick={handleShowHardBanner}><span>
                                <i className="fa-solid fa-star fa-bounce"></i> Hard</span></button>
                        </div>
                    </div>
                </div>
            </div>
            {(bannerState.showModal) &&
                <NoMatchFoundPopUp/>
            }
        </div>
    )
}

export default MatchPage