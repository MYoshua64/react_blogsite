import { Request, Response, Router } from "express";
import blogpostService from "../services/blogpost-service";
import { BlogPost } from "../models/blog-post";

const blogPostRoute = Router();

blogPostRoute.get("/:id([0-9]+)", async (req: Request, res: Response) => {
  try {
    const accountId = +req.params.id;
    const posts = await blogpostService.getAllPostsFromAccount(accountId);
    res.status(200).send(posts);
  } catch (err) {
    res.status(404).send((err as Error).message);
  }
});

blogPostRoute.get("/feed/:accountId([0-9]+)", async(req:Request, res:Response) => {
    try{
        const accountId = +req.params.accountId;
        const posts = await blogpostService.getBlogFeed(accountId);

        res.status(200).send(posts);
    }
    catch(err){
        res.status(404).send((err as Error).message);
    }
})

blogPostRoute.post("/add", async(req:Request, res:Response) => {
    try{
        const postToAdd = new BlogPost(req.body);
        const addedPost = await blogpostService.makePost(postToAdd);
        res.status(201).send(addedPost);
    }
    catch(err){
        res.status(500).send((err as Error).message);
    }
})

export default blogPostRoute;
