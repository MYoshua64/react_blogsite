import { ResultSetHeader } from "mysql2";
import dal from "../dal";
import { Account } from "../models/account";

async function getAllAccounts():Promise<Account[]>{
  const result = await dal.executeQuery("SELECT * FROM accounts");
  return result as unknown as Account[];
}

async function getAccountFromUserId(userId: number): Promise<Account> {
  const result = await dal.executeQuery(
    "SELECT * FROM accounts WHERE userId = ?",
    [userId]
  );
  return result[0] as unknown as Account;
}

async function getAccountFollows(accountId:number):Promise<Account[]>{
    const result = await dal.executeQuery(
        `SELECT accountId, userId, displayName, profileImageUrl FROM accounts AS a 
        JOIN (SELECT * FROM follow_lists WHERE follow_lists.followerId = ?) AS f
        ON a.accountId = f.followingId`, [accountId]
    );
    if (result.length > 0){
        return result as unknown as Account[];
    }
    throw new Error("The account given (id of " + accountId + " is not following anyone.");
}

async function getFollowingAccounts(accountId:number):Promise<Account[]>{
    const result = await dal.executeQuery(
        `SELECT accountId, userId, displayName, profileImageUrl FROM accounts AS a 
        JOIN (SELECT * FROM follow_lists WHERE follow_lists.followingId = ?) AS f
        ON a.accountId = f.followerId`, [accountId]
    );
    if (result.length > 0){
        return result as unknown as Account[];
    }
    throw new Error("Could not retrieve followers list");
}

async function createAccountWithUserId(userId: number): Promise<Account> {
  const result = await dal.executeQuery(
    "INSERT INTO accounts VALUES(DEFAULT, ?, DEFAULT, DEFAULT",
    [userId]
  );
  if ((result as unknown as ResultSetHeader).affectedRows > 0) {
    const createdAcc = await dal.executeQuery(
      "SELECT * FROM accounts WHERE accountId = ?",
      [(result as unknown as ResultSetHeader).insertId]
    );
    return createdAcc[0] as unknown as Account;
  }
  throw new Error("Could not create account at this time.");
}

async function updateAccountDetails(updated: Account): Promise<Account> {
  const result = await dal.executeQuery(
    "UPDATE accounts SET displayName = ?, profileImageUrl = ? WHERE accountId = ?",
    [updated.displayName, updated.profileImageUrl, updated.accountId]
  );
  if ((result as unknown as ResultSetHeader).affectedRows > 0){
    const acc = await dal.executeQuery("SELECT * FROM accounts WHERE accountId = ?",
    [updated.accountId]);
    return acc[0] as unknown as Account;
  }
  throw new Error("Could not update account at this time.")
}

export default {
  getAllAccounts,
  getAccountFromUserId,
  getAccountFollows,
  getFollowingAccounts,
  createAccountWithUserId,
  updateAccountDetails
};
