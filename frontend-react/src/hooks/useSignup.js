import { UserContext } from "../contexts/userContext";
import { useState } from "react";
import { useUserContext } from "./useUserContext";
import { useNavigate } from 'react-router-dom'
import { post } from "../apis/UserProfileApi";

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const {dispatch} = useUserContext()
  const navigate = useNavigate()

  const signup = async (username, password, email) => {
    setIsLoading(true)
    setError(null)

    const response = await post({username, password, email})
    const json = await response.json()
    if (!response.ok) {
        setIsLoading(false)
        setError(json.error)
    }

    if(response.ok) {
        localStorage.setItem('user', JSON.stringify(json))

        dispatch({type: 'SET_USER', payload:json})
        setIsLoading(false)
        navigate("/match")
    }
  }

  return {signup, isLoading, error, setError}
}