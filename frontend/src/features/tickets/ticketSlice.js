import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ticketService from './ticketService'

// //get user from localstorage
// const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  tickets: [],
  ticket: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const createTicket = createAsyncThunk(
  'tickets/create',
  async (ticketData, thunkAPI) => {
    try {
      //fetch token
      const token = thunkAPI.getState().auth.user.token

      return await ticketService.createTicket(ticketData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
//   try {
//     return await authService.login(user)
//   } catch (error) {
//     const message =
//       (error.response && error.response.data && error.response.data.message) ||
//       error.message ||
//       error.toString()

//     return thunkAPI.rejectWithValue(message)
//   }
// })

// export const logout = createAsyncThunk('auth/logout', async () => {
//   await authService.logout()
// })

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  //handle different cases catched: pending fulfilled rejected
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true
      })

      .addCase(createTicket.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
      })

      .addCase(createTicket.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

    //       .addCase(logout.fulfilled, (state) => {
    //         state.user = null
    //       })

    //       .addCase(login.pending, (state) => {
    //         state.isLoading = true
    //       })
    //       .addCase(login.fulfilled, (state, action) => {
    //         state.isLoading = false
    //         state.isSuccess = true
    //         state.user = action.payload
    //       })
    //       .addCase(login.rejected, (state, action) => {
    //         state.isLoading = false
    //         state.isError = true
    //         state.user = null
    //         state.message = action.payload
    //       })
  },
})

export const { reset } = ticketSlice.actions
export default ticketSlice.reducer
