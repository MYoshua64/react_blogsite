import cyber from "../services/cyber";

export class User{
    public userId:number;
    public userName:string;
    public email:string;
    public password:string;

    public constructor(baseUser:User){
        this.userId = 0;
        this.userName = baseUser.userName;
        this.email = cyber.hashString(baseUser.email);
        this.password = cyber.hashString(baseUser.password);
    }
}