import { configureStore, createReducer } from "@reduxjs/toolkit";
import { User } from "../../Models/User";
import { getLoggedUser, loginUser, logoutUser } from "./Actions";
import { jwtDecode } from "jwt-decode";

export interface UserState {
  token: string | null;
  user: User | null;
}

const initState:UserState = {
  token: null,
  user: null
}

const userReducer = createReducer(initState, (builder) => {
  builder.addCase(loginUser, (state, action) => {
    state.token = action.payload;
    state.user = jwtDecode<({user:User})>(action.payload).user;
    localStorage.setItem("token", action.payload)
  })
  .addCase(logoutUser, (state, action) => {
    state.token = null;
    state.user = null;
    localStorage.removeItem("token");
  });
});

export const userStore = configureStore({
  reducer: userReducer,
});
