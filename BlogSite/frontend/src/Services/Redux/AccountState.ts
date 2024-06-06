import { configureStore, createReducer } from "@reduxjs/toolkit";
import { Account } from "../../Models/Account";
import { populateAccounts } from "./Actions";

export interface AccountState{
    accounts:Account[];
}

const initState:AccountState = {
    accounts: []
}

const accountReducer = createReducer(initState, (builder) => {
    builder.addCase(populateAccounts, (state, action) => {
        state.accounts = action.payload;
    })
})

export const accountStore = configureStore({
    reducer: accountReducer
})