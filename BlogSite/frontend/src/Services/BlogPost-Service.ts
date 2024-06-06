import axios from "axios";
import { BlogPost } from "../Models/BlogPost";
import { userStore } from "./Redux/UserState";
import { appConfig } from "../Config/AppConfig";
import { Account } from "../Models/Account";

async function getBlogFeed():Promise<BlogPost[]>{
    try{
        const currentUser = userStore.getState().user;

        const accountId = (await axios.get<Account>(appConfig.accountURL + currentUser?.userId)).data.accountId;

        const feedResponse = await axios.get<BlogPost[]>(appConfig.postURL + "feed/"+ accountId);

        const posts = feedResponse.data.map(p => new BlogPost(p));
        return posts;
    }
    catch(err){
        console.error((err as Error).message);
        return [];
    }
}

async function getPostsFromAccount(accountId:number):Promise<BlogPost[]>{
    try{
        const result = await axios.get<BlogPost[]>(appConfig.postURL + accountId);
        const posts = result.data.map(p => new BlogPost(p));
        return posts;
    }
    catch(err){
        console.error((err as Error).message);
        return [];
    }
}

async function addPost(post:BlogPost){
    try{
        const result = await axios.post<BlogPost>(appConfig.postURL + "add", post);
        const addedPost = result.data;
    }
    catch(err){
        console.error((err as Error).message);
    }
}

export default{
    getBlogFeed,
    getPostsFromAccount,
    addPost
}