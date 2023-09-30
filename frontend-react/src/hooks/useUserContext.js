import { UserContext } from "../contexts/userContext";
import { useContext } from "react";

export const useUserContext = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw Error("UserContext must be used inside a UserContext Provider")
  }
  return context
}