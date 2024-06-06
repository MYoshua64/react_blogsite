import cyber from "../services/cyber";

export class Credentials{
    public userName:string;
    public password:string;

    constructor(baseCred:Credentials){
        this.userName = baseCred.userName;
        this.password = cyber.hashString(baseCred.password);
    }
}