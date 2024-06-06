import { ResultSetHeader } from "mysql2";
import dal from "../dal";
import { User } from "../models/user";
import cyber from "./cyber";
import { Credentials } from "../models/credentials";

async function registerUser(userToRegister: User): Promise<User> {
  const result = await dal.executeQuery(
    "INSERT INTO users VALUES(DEFAULT, ?, ?, ?)",
    [userToRegister.userName, userToRegister.email, userToRegister.password]
  );
  if ((result as unknown as ResultSetHeader).affectedRows > 0) {
    const user = await dal.executeQuery(
      "SELECT * FROM users WHERE userId = ?",
      [(result as unknown as ResultSetHeader).insertId]
    );
    return user[0] as unknown as User;
  }
  throw new Error("Could not register user");
}

async function authUser(userToAuth: Credentials): Promise<string> {
  const userNameResult = await dal.executeQuery(
    "Select * FROM users WHERE userName = ? AND password = ?",
    [userToAuth.userName, userToAuth.password]
  );
  if (userNameResult.length > 0) {
    const loggedUser = userNameResult[0] as unknown as User;
    const userToken = cyber.createToken(loggedUser);
    return userToken;
  }
  throw new Error("Username/Password incorrect!");
}

export default {
  registerUser,
  authUser,
};
