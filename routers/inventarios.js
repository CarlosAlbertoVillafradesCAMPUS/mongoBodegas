import "reflect-metadata";
import { plainToClass } from "class-transformer";
import { Router } from "express";
import { conexion } from "../db/connect.js";
import {configGet} from "../middleware/limit.js"
import {appDtoDataInventarios, appMiddlewareInventariosVerify} from "../middleware/inventariosVerify.js";
import {dtoErrors} from "../routers/controller/dtoErrors.js";
import { autoIncrement } from "../helpers/autoIncrement.js";

const storageInventarios = Router();
storageInventarios.use(configGet());
storageInventarios.use(appMiddlewareInventariosVerify);

let dataBase = await conexion()

storageInventarios.get("/", async(req,res)=>{
    try {
        let collection =  dataBase.collection("inventarios");
        let data = await collection.aggregate([
            {
                $project:{
                    _id:0,
                    ID: "$ID",
                    Id_Bodega: "$id_bodega",
                    Id_Producto: "$id_producto",
                    Cantidad: "$cantidad",
                    Created_By: "$created_by",
                    Created_At: "$created_at",
                    Update_At: "$update_at"
                }
            }
        ]).toArray();
        res.send(data)
    } catch (error) {
        console.log(error.message)
    }
})

storageInventarios.post('/', appDtoDataInventarios, async(req, res) => {
    try{
        /* Realizar un EndPoint que permita insertar registros en la tabla de
inventarios, los parámetros de entradadebenser
(id_producto,id_bodega,cantidad). */
/* {
    "Id_Bodega": 2,
    "Id_Producto": 5,
    "Cantidad": 3,
    "Created_By": 1
  } */
        let {id_producto, id_bodega, cantidad} = req.body

        let collection =  dataBase.collection("inventarios");
        let combinacion = await collection.findOne(
            {
                id_producto,
                id_bodega
            }
        );
        if (!combinacion) {
            let newId = await autoIncrement("inventarios");
            req.body.created_at = new Date();
            await collection.insertOne({
                ID: newId,
                ...req.body
            })
            res.status(201).send({status:201, message: "[Inventario Inexistente]. Agregado con exito"})
        } else{
            await collection.updateOne(
                {
                    "ID": combinacion.ID
                },
                {
                    $inc:{"cantidad": cantidad },
                    $set:{"update_at": new Date()}
                })
                res.status(201).send({status:201, message:"[Inventario Existente]. Modificada la cantidad con exito"})
        }
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

export default storageInventarios;