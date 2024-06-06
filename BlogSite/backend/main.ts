import express from "express";
import bodyParser from "body-parser";
import { appConfig } from "./config/appconfig";
import cors from "cors";
import userRoute from "./routes/users-route";
import accountRoutes from "./routes/account-routes";
import blogPostRoute from "./routes/blogpost-routes";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/users", userRoute);
app.use("/accounts", accountRoutes);
app.use("/posts", blogPostRoute);

app.listen(appConfig.serverPort, () => {
    console.log(`Server is running on http://localhost:${appConfig.serverPort}`);
})