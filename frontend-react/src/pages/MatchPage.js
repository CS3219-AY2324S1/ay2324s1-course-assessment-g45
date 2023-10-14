import { useNavigate } from "react-router-dom"
import { useUserContext } from "../hooks/useUserContext"
import { useWaitingBanner } from '../hooks/useWaitingBanner';

const MatchPage = () => {
    const { user, dispatch } = useUserContext()
    const navigate = useNavigate()
    const { state: bannerState, dispatch: bannerDispatch } = useWaitingBanner();

    const handleShowEasyBanner = () => {
        if (bannerState.showBanner === false) {
            bannerDispatch({ type: 'SHOW_EASY_BANNER' });
        }
    }

    const handleShowMediumBanner = () => {
        if (bannerState.showBanner  === false) {
            bannerDispatch({ type: 'SHOW_MEDIUM_BANNER' });
        }
    }

    const handleShowHardBanner = () => {
        if (bannerState.showBanner  === false) {
            bannerDispatch({ type: 'SHOW_HARD_BANNER' });
        }
    }


    return (
        <div>
            <div className="col-lg-4 offset-lg-4 grid-margin stretch-card mt-5">
                <div className="card">
                    <div className="card-body">
                        <div className='card-title'>
                            <div class="match-wrapper">
                                <div class="match-gradient-div">
                                    <i class="fa-solid fa-code-compare fa-xl"></i>
                                </div>
                                <span class="match-text">Quick Match</span>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-5 mt-2">
                            <button class="custom-match-btn easy-btn" onClick={handleShowEasyBanner}><span>
                                <i className="fa-regular fa-star fa-bounce"></i> Easy</span></button>
                            <button class="custom-match-btn medium-btn" onClick={handleShowMediumBanner}><span>
                                <i class="fa-regular fa-star-half-stroke fa-bounce"></i> Medium</span></button>
                            <button class="custom-match-btn hard-btn" onClick={handleShowHardBanner}><span>
                                <i className="fa-solid fa-star fa-bounce"></i> Hard</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MatchPage