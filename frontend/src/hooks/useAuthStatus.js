import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  //get user from redux(authSlice.js)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (user) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
    setLoading(false)
  }, [user])

  //get if logged in
  return { loggedIn, loading }
}
