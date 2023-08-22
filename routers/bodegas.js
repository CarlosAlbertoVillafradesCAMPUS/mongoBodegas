import "reflect-metadata";
import { plainToClass } from "class-transformer";
import { Router } from "express";
import { conexion } from "../db/connect.js";
import {configGet} from "../middleware/limit.js"
import {appDtoDataBodegas, appMiddlewareBodegasVerify} from "../middleware/bodegasVerify.js";
import {dtoErrors} from "../routers/controller/dtoErrors.js";
import { autoIncrement } from "../helpers/autoIncrement.js";

const storageBodegas = Router();
storageBodegas.use(configGet());
storageBodegas.use(appMiddlewareBodegasVerify);

let dataBase = await conexion()

//Realizar un EndPolnt que permita listar todas las bodegas ordenadas alfabéticamente.
storageBodegas.get("/", async(req,res)=>{
    try {
        let collection =  dataBase.collection("bodegas");
        let data = await collection.aggregate([
            {
              $sort:{nombre: -1}
            },
            {
              $project: {
                _id: 0,
              },
            },
          ])
          .toArray();
        res.send(data)
    } catch (error) {
        console.log(error.message)
    }
})

storageBodegas.post('/', appDtoDataBodegas, async(req, res) => {
    /*{
        "Nombre": " El gran villa",
        "Responsable": 1,
        "Estado": 1,
        "Created_By": 1,
        "Update_By": 1,
      }*/
    try{
      let newId = await autoIncrement("bodegas")
      req.body.created_at = new Date();

        let collection =  dataBase.collection("bodegas");
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

export default storageBodegas;