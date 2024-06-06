export class User{
    public static Blank = new User({
        userId: -1,
        userName: "Guest",
        email: "No email",
        password: "No password"
    });

    public userId:number;
    public userName:string;
    public email:string;
    public password:string;

    constructor(baseUser:User){
        this.userId = baseUser.userId;
        this.userName = baseUser.userName;
        this.email = baseUser.email;
        this.password = baseUser.password;
    }
}