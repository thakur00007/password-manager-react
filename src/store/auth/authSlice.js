import { createSlice } from "@reduxjs/toolkit"
import { removeValue, setValue } from "../../services/localStorage"

const initialState = {
  status: false,
  loggedInUser: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log(action.payload)
      state.status = true
      state.loggedInUser = action.payload
      
      action.payload.token && setValue("auth-token", action.payload.token)
    },
    logout: (state) => {
      state.status = false
      state.loggedInUser = null
      removeValue("auth-token")
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer