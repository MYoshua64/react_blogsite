import axios from "axios";
import { appConfig } from "../Config/AppConfig";
import { Account } from "../Models/Account";
import { accountStore } from "./Redux/AccountState";
import { populateAccounts } from "./Redux/Actions";

async function getAllAccounts():Promise<Account[]>{
    const result = await axios.get<Account[]>(appConfig.accountURL);
    const accounts = result.data;
    accountStore.dispatch(populateAccounts(accounts));
    return accounts;
}

export default {
    getAllAccounts
}