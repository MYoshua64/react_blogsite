import { createHash } from "node:crypto";
import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";
import { User } from "../models/user";

const publicKey = "Rhanno's Shop";
const privateKey = "My$h0pS3cre7!";

function hashString(input: string): string {
  const hash = createHash("sha512");
  return hash.update(input).digest("hex");
}

function createToken(user: User): string {
  const currentTime = Math.floor(Date.now() / 1000);
  const expirationTime = currentTime + 1800;
  const payload = {
    sub: publicKey,
    exp: expirationTime,
    user: user
  };

  const jwtToken = jwt.sign(payload, privateKey, { algorithm: "HS256" });
  return jwtToken;
}

export default {
  hashString,
  createToken
};
