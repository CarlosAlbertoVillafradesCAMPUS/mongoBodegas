import { classToPlain, plainToClass } from "class-transformer";
import { Router } from "express";
import { validate } from "class-validator";
import {structurasDto} from "./jwt.js"

const appMiddlewareBodegasVerify = Router();
const appDtoDataBodegas = Router();

appMiddlewareBodegasVerify.use(async(req,res,next)=>{
    let {payload} = req.data;
    let {iat, exp, ...newPayload} = payload;
    console.log(newPayload);
    payload = newPayload;

    let clone = JSON.stringify(classToPlain(plainToClass(structurasDto("bodegas").class,{},{ignoreDecorators:true})))
    let verify = clone === JSON.stringify(payload);
    (!verify) ?res.status(406).send({status:406, message:"No Autorizado"}) :next();
})

appDtoDataBodegas.use(async(req,res,next)=>{
    try {
        let data = plainToClass(structurasDto("bodegas").class, req.body);
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
    appDtoDataBodegas,
    appMiddlewareBodegasVerify
}