import "reflect-metadata";
import { plainToClass } from "class-transformer";
import { Router } from "express";
import { conexion } from "../db/connect.js";
import {configGet} from "../middleware/limit.js"
import {appDtoDataProductos, appMiddlewareProductosVerify} from "../middleware/productosVerify.js";
import {dtoErrors} from "../routers/controller/dtoErrors.js";
import { autoIncrement } from "../helpers/autoIncrement.js";

const storageProductos = Router();
storageProductos.use(configGet());
storageProductos.use(appMiddlewareProductosVerify);
let dataBase = await conexion()

storageProductos.get("/", async(req,res)=>{
    try {
        let collection =  dataBase.collection("productos");
        let data = await collection.aggregate([
            {
                $lookup: {
                    from: "inventarios", 
                    localField: "ID",    
                    foreignField: "id_producto",
                    as: "inventarios_info"
                }
            },
            {
                $unwind: "$inventarios_info"
            },
            {
                $group: {
                    _id: "$_id",
                    ID: {$first:"$ID"},
                    nombre: { $first: "$nombre" },
                    descripcion: { $first: "$descripcion" },
                    estado: { $first: "$estado" },
                    created_by: { $first: "$created_by" },  
                    total: { $sum: "$inventarios_info.cantidad" }, 
                }
            },
            {
                $project:{
                    _id:0
                }
            },
            {
                $sort: { total: -1 } 
            }
        ]).toArray();
        res.send(data)
    } catch (error) {
        res.status(401).send({status:401, message:error.message})
    }
})

storageProductos.post('/', appDtoDataProductos, async(req, res) => {
    try{
        let newId = await autoIncrement("productos");
        req.body.created_at = new Date();

        let collectionProduct =  dataBase.collection("productos");
        let collectionInventarios = dataBase.collection("inventarios");
        let collectionBodegas= dataBase.collection("bodegas");

        await collectionProduct.insertOne({
            ID: newId,
            ...req.body});
        
            //numero aleaotrio para la cantidad
         let cantidadIni = parseInt(Math.random() * 30);
        let BodegaIni = await collectionBodegas.aggregate().toArray();
        let cantBodega = BodegaIni.length
        //ID de una bodega aleatoriamente
        BodegaIni = BodegaIni[parseInt(Math.random() * cantBodega)]
        BodegaIni = BodegaIni.ID 

        let newIdInven = await autoIncrement("inventarios");
        await collectionInventarios.insertOne({
            ID: newIdInven,
            id_bodega: BodegaIni,
            id_producto: newId,
            cantidad: cantidadIni,
            created_by: 0,
            created_at: new Date()
        })
        res.status(201).send({status:201, message:"Agregado con exito"});
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

export default storageProductos;