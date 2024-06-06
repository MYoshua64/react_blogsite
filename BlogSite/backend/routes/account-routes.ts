import { Request, Response, Router } from "express";
import accountsService from "../services/accounts-service";
import { Account } from "../models/account";

const accountRoutes = Router();

accountRoutes.get("/", async (req:Request, res:Response) => {
    try{
        const accounts = await accountsService.getAllAccounts();
        res.status(200).send(accounts);
    }
    catch(err){
        res.status(404).send((err as Error).message);
    }
})

accountRoutes.get("/:id([0-9]+)", async(req:Request, res:Response) => {
    try{
        const userId = +req.params.id;
        const account = await accountsService.getAccountFromUserId(userId);
        res.status(200).send(account);
    }
    catch(err){
        res.status(404).send((err as Error).message);
    }
})

accountRoutes.get("/following/:id([0-9]+)", async(req:Request, res:Response) => {
    try{
        const accountId = +req.params.id;
        const followedAccs = await accountsService.getAccountFollows(accountId);
        res.status(200).send(followedAccs);
    }
    catch(err){
        res.status(404).send((err as Error).message);
    }
})

accountRoutes.get("/followers/:id([0-9+])", async(req:Request, res:Response) => {
    try{
        const accountId = +req.params.id;
        const followedAccs = await accountsService.getFollowingAccounts(accountId);
        res.status(200).send(followedAccs);
    }
    catch(err){
        res.status(404).send((err as Error).message);
    }
})

accountRoutes.post("/create", async (req:Request, res:Response) => {
    try{
        const userId = +req.body.id;
        const createdAcc = await accountsService.createAccountWithUserId(userId);
        res.status(201).send(createdAcc);
    }
    catch(err){
        res.status(500).send((err as Error).message);
    }
})

accountRoutes.put("/update", async (req:Request, res:Response) => {
    try{
        const accToUpdate = new Account(req.body);
        const updatedAcc = await accountsService.updateAccountDetails(accToUpdate);
        res.status(200).send(updatedAcc);
    }
    catch(err){
        res.status(500).send((err as Error).message);
    }
})

export default accountRoutes;