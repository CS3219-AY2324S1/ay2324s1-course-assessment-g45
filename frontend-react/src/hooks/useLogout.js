import { useUserContext } from "./useUserContext"
import { useQuestionsContext } from "./useQuestionContext"
import { useMatchContext } from "./useMatchContext"
import { useNavigate } from 'react-router-dom'

export const useLogout = () => { 
    const {dispatch} = useUserContext()
    const {dispatch : questionsDispatch} = useQuestionsContext()
    const {dispatch : bannerDispatch} = useMatchContext()
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('user')
        dispatch({type: 'LOGOUT'})
        questionsDispatch({type: 'SET_QUESTIONS', payload: null})
        bannerDispatch({type: 'HIDE_BANNER'})
        navigate("/login")
    }

    return {logout}
}