import axios from 'axios'
//for making request

const API_URL = '/api/users'

const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    //save data and token to localStorage
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

const login = async (userData) => {
  const response = await axios.post('/api/users/login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

const logout = () => localStorage.removeItem('user')

const authService = {
  register,
  logout,
  login,
}

export default authService
