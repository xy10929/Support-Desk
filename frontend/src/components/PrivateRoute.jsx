import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'
import Spinner from './Spinner'

const PrivateRoute = () => {
  const { loggedIn, loading } = useAuthStatus()

  if (loading) {
    return <Spinner />
  }

  //loggedIn -> NewTicket.jsx
  return loggedIn ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute
