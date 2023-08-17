import "reflect-metadata";
import { plainToClass } from "class-transformer";
import { Router } from "express";
import { conexion } from "../db/connect.js";
import {configGet} from "../middleware/limit.js"
import {appDtoDataHistoriales, appMiddlewareHistorialesVerify} from "../middleware/historialesVerify.js";
import {dtoErrors} from "../routers/controller/dtoErrors.js";

const storageHistoriales = Router();
storageHistoriales.use(configGet());
storageHistoriales.use(appMiddlewareHistorialesVerify);

let dataBase = await conexion()

storageHistoriales.get("/", async(req,res)=>{
    try {
        let collection =  dataBase.collection("historiales");
        let data = await collection.find().toArray();
        res.send(data)
    } catch (error) {
        console.log(error.message)
    }
})

storageHistoriales.post('/', appDtoDataHistoriales, async(req, res) => {
    try{
        let collection =  dataBase.collection("historiales");
        let result = await collection.insertOne(req.body);
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

export default storageHistoriales;