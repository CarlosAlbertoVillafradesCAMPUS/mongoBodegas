import { classToPlain, plainToClass } from "class-transformer";
import { Router } from "express";
import { validate } from "class-validator";
import {structurasDto} from "./jwt.js"

const appMiddlewareProductosVerify = Router();
const appDtoDataProductos = Router();

appMiddlewareProductosVerify.use(async(req,res,next)=>{
    let {payload} = req.data;
    let {iat, exp, ...newPayload} = payload;
    payload = newPayload;

    let clone = JSON.stringify(classToPlain(plainToClass(structurasDto("productos").class,{},{ignoreDecorators:true})))
    let verify = clone === JSON.stringify(payload);
    (!verify) ?res.status(406).send({status:406, message:"No Autorizado"}) :next();
})

appDtoDataProductos.use(async(req,res,next)=>{
    try {
        let data = plainToClass(structurasDto("productos").class, req.body);
        console.log(data);
        await validate(data);
        req.body = JSON.parse(JSON.stringify(data))
        req.data = undefined;
        next()
    } catch (error) {
        res.status(error.status).send(error)
    }
})

export {
    appDtoDataProductos,
    appMiddlewareProductosVerify
}