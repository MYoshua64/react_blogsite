export class Account{
    public accountId:number;
    public userId:number;
    public displayName:string;
    public profileImageUrl:string;

    public constructor(baseAcc:Account){
        this.accountId = baseAcc.accountId;
        this.userId = baseAcc.userId;
        this.displayName = baseAcc.displayName;
        this.profileImageUrl = baseAcc.profileImageUrl;
    }
}