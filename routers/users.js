import "reflect-metadata";
import { plainToClass } from "class-transformer";
import { Router } from "express";
import { conexion } from "../db/connect.js";
import {configGet} from "../middleware/limit.js"
import {appDtoDataUsers, appMiddlewareUsersVerify} from "../middleware/usersVerify.js";
import {dtoErrors} from "../routers/controller/dtoErrors.js";
import { autoIncrement } from "../helpers/autoIncrement.js";

const storageUser = Router();
storageUser.use(configGet());
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
        let newId = await autoIncrement("users");
        req.body.created_at = new Date();

        let collection =  dataBase.collection("users");
        let result = await collection.insertOne({
            ID: newId,
            ...req.body});
        res.status(201).send(result);
    } catch (error){
        let errors = error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied;
        let objError = {};
        errors.forEach((val,id) => {
            let propiedad = val.propertyName;
            objError[`${propiedad}`] = val.description
        });
        let data = plainToClass(dtoErrors, objError);
        res.status(400).send({status:400, message: data});
    }
});

export default storageUser;