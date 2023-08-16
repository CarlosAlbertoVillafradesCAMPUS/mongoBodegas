import { Router } from "express";
import { conexion } from "../db/connect.js";
import {appDtoDataUsers, appMiddlewareUsersVerify} from "../middleware/usersVerify.js";

const storageUser = Router();
storageUser.use(appMiddlewareUsersVerify);

let dataBase = await conexion()

storageUser.get("/", async(req,res)=>{
    try {
        let collection =  dataBase.collection("users");
        let data = await collection.find().toArray();
        res.send(data)
    } catch (error) {
        console.log(error.message)
    }
})

storageUser.post('/', appDtoDataUsers, async(req, res) => {
    try{
        let collection =  dataBase.collection("users");
        let result = await collection.insertOne(req.body);
        res.status(201).send(result);
    } catch (error){
        res.send(error);
    }
});

export default storageUser;