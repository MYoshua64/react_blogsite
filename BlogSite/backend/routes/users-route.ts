import { Request, Response, Router } from "express";
import usersService from "../services/users-service";
import { User } from "../models/user";
import { Credentials } from "../models/credentials";

const userRoute = Router();

userRoute.post("/register", async (req:Request, res:Response) => {
    try{
        const userToRegister = new User(req.body);
        const addedUser = await usersService.registerUser(userToRegister);
        res.status(201).send(addedUser);
    }
    catch(err){
        res.status(500).send((err as Error).message);
    }
    
});

userRoute.post("/auth", async (req:Request, res:Response) => {
    try{
        const userToAuth = new Credentials(req.body);
        const userToken = await usersService.authUser(userToAuth);
        res.status(200).send(userToken);
    }
    catch(err){
        res.status(403).send((err as Error).message);
    }
});

export default userRoute;