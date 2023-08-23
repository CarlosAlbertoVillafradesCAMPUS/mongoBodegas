import "reflect-metadata";
import { plainToClass } from "class-transformer";
import { Router } from "express";
import { conexion, conAtlas } from "../db/connect.js";
import {configGet} from "../middleware/limit.js"
import {appDtoDataInventarios, appMiddlewareInventariosVerify} from "../middleware/inventariosVerify.js";
import { appDtoDataHistoriales } from "../middleware/historialesVerify.js";
import {dtoErrors} from "../routers/controller/dtoErrors.js";
import { autoIncrement } from "../helpers/autoIncrement.js";
import { MongoClient } from "mongodb";

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
            /* Realizar un EndPoint que permita insertar registros en la tabla de
inventarios, los parámetros de entradadebenser
(id_producto,id_bodega,cantidad). */
/* {
    "Id_Bodega": 2,
    "Id_Producto": 5,
    "Cantidad": 3,
    "Created_By": 1
  } */
    try{
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

storageInventarios.post('/transladar', appDtoDataHistoriales, async(req, res) => {
       /* Realizar un EndPolnt que permita Trasladar unproducto de una bodega a otra*/
/* {
  "Id_Bodega": 2,
  "Id_Bodega_Destino": 4,
  "Id_Producto": 1,
  "Cantidad": 3,
  "Created_By": 1
}*/ 
const client = await conAtlas();
const session = client.startSession();
session.startTransaction();

    try{
        let {id_bodega_origen, id_bodega_destino, id_producto, cantidad} = req.body;
        let collection =  dataBase.collection("inventarios");
        let collecionBodega = dataBase.collection("bodegas")
        let bodegaExist = await collecionBodega.findOne({ID: id_bodega_origen})
        if (!bodegaExist) {
            return res.status(400).send({status:400, message: "Error, Bodega de origen inexistente"});       
        }
        let validateInventario = await collection.findOne(
            {
                id_bodega: id_bodega_origen,
                id_producto: id_producto,
                
            });
        
        if (!validateInventario) {
            return res.status(400).send({status:400, message: "Error en los parametros de entrada"});       
        }
        if(validateInventario.cantidad < cantidad) {
            return res.status(400).send({status:400, message: "Error, cantidad insuficiente para el transpaso"})
        }

        let combinacion = await collection.findOne(
            {
                id_producto: id_producto,
                id_bodega: id_bodega_destino
            }
        );
        if (!combinacion) {
            await collection.updateOne(
                {
                    "ID": validateInventario.ID
                },
                {
                    $inc:{"cantidad": -cantidad},
                    $set:{"update_at": new Date()}
                });

            let newId = await autoIncrement("inventarios");
            await collection.insertOne({
                ID: newId,
                id_bodega: id_bodega_destino,
                id_producto: id_producto,
                cantidad: cantidad,
                created_by: req.body.created_by,
                created_at: new Date()
            });

            return res.status(201).send({status:201, message:"Transpaso Exito. [Inventario Destino Inexistente]. se creo el inventario y se Realizo el transpaso"})  
            }
                await collection.updateOne(
                    {
                        "ID": validateInventario.ID
                    },
                    {
                        $inc:{"cantidad": -cantidad },
                        $set:{"update_at": new Date()}
                    })

                await collection.updateOne(
                    {
                        "ID": combinacion.ID
                    },
                    {
                        $inc:{"cantidad": cantidad },
                        $set:{"update_at": new Date()}
                    })

                res.status(201).send({status:201, message:"Transpaso Existoso"})
        
    } catch (error){
        await session.abortTransaction();
        session.endSession();
        res.status(400).send({status:400, message: error.message});

        if (error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied) {
            let errors = error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied;
            let objError = {};
            errors.forEach((val,id) => {
                let propiedad = val.propertyName;
                objError[`${propiedad}`] = val.description
            });
    
            let data = plainToClass(dtoErrors, objError);
            res.status(400).send({status:400, message: data});
        }
       
    } finally{
        client.close();
    }
});

export default storageInventarios;