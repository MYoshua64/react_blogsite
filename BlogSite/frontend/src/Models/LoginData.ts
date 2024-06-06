import { User } from "./User";

export class LoginData{
    public token:string;
    public user:User;

    constructor(token:string, user:User){
        this.token = token;
        this.user = user;
    }
}