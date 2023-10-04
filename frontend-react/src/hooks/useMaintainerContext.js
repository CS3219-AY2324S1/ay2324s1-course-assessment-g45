import { MaintainerContext } from "../contexts/MaintainerContext";
import { useContext } from "react";

export const useMaintainerContext = () => {
  const context = useContext(MaintainerContext)
  if (!context) {
    throw Error("MaintainerContext must be used inside a MaintainerContext Provider")
  }
  return context
}