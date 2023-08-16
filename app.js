import dotenv from "dotenv";
import express from "express";
import storageUser from "./routers/users.js";
import {generarToken, validarToken} from "./middleware/jwt.js";

dotenv.config();
const appExpress = express();
appExpress.use(express.json())
appExpress.use("/token", generarToken)
appExpress.use("/users", validarToken, storageUser)

let my_server = JSON.parse(process.env.MY_SERVER)
appExpress.listen(my_server, ()=>console.log(`http://${my_server.hostname}:${my_server.port}`));