import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'
import { extractErrorMessage } from '../../utils'

//get user from localstorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user)
    } catch (error) {
      //   const message =
      //     (error.response &&
      //       error.response.data &&
      //       error.response.data.message) ||
      //     error.message ||
      //     error.toString()

      //   return thunkAPI.rejectWithValue(message)
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  console.log(user)
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    },
  },

  //handle different cases ctached: pending fulfilled reject
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.user = null
        state.message = action.payload
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
