import { useSelector } from "react-redux"
import { selectCurrentUser } from "../slice/authSlice"
import { useMemo } from "react"


export const useAuth = () => {
  const user = useSelector(selectCurrentUser)

  return useMemo(()=> ({user}), [user])
}