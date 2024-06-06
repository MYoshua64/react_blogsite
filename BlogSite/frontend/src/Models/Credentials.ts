export class Credentials{
    public userName:string;
    public password:string;

    constructor(baseCred:Credentials){
        this.userName = baseCred.userName;
        this.password = baseCred.password;
    }
}