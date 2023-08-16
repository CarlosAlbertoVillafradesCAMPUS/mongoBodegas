import dotenv from "dotenv";
import express from "express";
import {generarToken, validarToken} from "./middleware/jwt.js";
import storageUser from "./routers/users.js";
import storageProductos from "./routers/productos.js";
import storageBodegas from "./routers/bodegas.js";
import storageInventarios from "./routers/inventarios.js";

dotenv.config();
const appExpress = express();
appExpress.use(express.json());
appExpress.use("/token", generarToken);
appExpress.use("/users", validarToken, storageUser);
appExpress.use("/productos", validarToken, storageProductos);
appExpress.use("/bodegas", validarToken, storageBodegas);
appExpress.use("/inventarios", validarToken, storageInventarios);


let my_server = JSON.parse(process.env.MY_SERVER)
appExpress.listen(my_server, ()=>console.log(`http://${my_server.hostname}:${my_server.port}`));