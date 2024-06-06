import axios, { AxiosError } from "axios";
import { Credentials } from "../Models/Credentials";
import { appConfig } from "../Config/AppConfig";
import { userStore } from "./Redux/UserState";
import { loginUser } from "./Redux/Actions";

/**
 * Authenticates user cerdentials and attempts login
 * @param data Credentials object containing username and password
 * @returns If login sucessful, returns the token and the user. Undefined if not.
 */
async function authUser(data:Credentials):Promise<string | undefined>{
    try{
        const response = await axios.post(appConfig.usersURL + "/auth", data);
        const userToken = response.data;

        userStore.dispatch(loginUser(userToken));

        return userToken;
    }
    catch(err){
        if (typeof(err) === typeof(AxiosError)){
            console.error((err as AxiosError).response?.data);
        }
        else console.error((err as Error).message);
    }
}

export default{
    authUser
}