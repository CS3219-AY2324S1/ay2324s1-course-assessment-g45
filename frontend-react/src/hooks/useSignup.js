import { UserContext } from "../contexts/userContext";
import { useState } from "react";
import { useUserContext } from "./useUserContext";

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const {dispatch} = useUserContext()

  const signup = async (username, password, email) => {
    setIsLoading(true)
    setError(null)
    ///api/user/signup

    const response = await fetch('/api/userProfiles/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password, email})
    })


    const json = await response.json()
    console.log(json.error)
    if (!response.ok) {
        setIsLoading(false)
        setError(json.error)
    }

    if(response.ok) {
        localStorage.setItem('user', JSON.stringify(json))

        dispatch({type: 'SET_USER', payload:json})
        setIsLoading(false)
    }
  }

  return {signup, isLoading, error}
}