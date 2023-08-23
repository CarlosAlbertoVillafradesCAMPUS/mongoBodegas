import { classToPlain, plainToClass } from "class-transformer";
import { Router } from "express";
import { validate } from "class-validator";
import {structurasDto} from "./jwt.js"

const appDtoDataHistoriales = Router();

appDtoDataHistoriales.use(async(req,res,next)=>{
    try {
        let data = plainToClass(structurasDto("historiales").class, req.body);
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
    appDtoDataHistoriales
}