import { createAction } from "@reduxjs/toolkit";
import { Account } from "../../Models/Account";

export const loginUser = createAction<string>("LOGIN_USER");
export const logoutUser = createAction("LOGOUT_USER");
export const getLoggedUser = createAction("GET_LOGGED_USER");
export const toggleModal = createAction<string>("TOGGLE_MODAL");
export const populateAccounts = createAction<Account[]>("POPULATE_ACCOUNTS");