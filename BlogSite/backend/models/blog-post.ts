export class BlogPost{
    public postId:number;
    public accountId:number;
    public postContent:string;
    public postDate:string;

    public constructor(postObj:BlogPost){
        this.postId = postObj.postId;
        this.accountId = postObj.accountId;
        this.postContent = postObj.postContent;
        this.postDate = postObj.postDate;
    }
}