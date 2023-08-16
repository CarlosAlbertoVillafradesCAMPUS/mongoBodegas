import {rateLimit} from "express-rate-limit";

export const configGet = () =>{
    return rateLimit({
        windowMs: 10 * 1000,
        max: 20,
        standardHeaders: true,
        legacyHeaders: false,
        message: (req,res) =>{
            res.status(429).send({
                status: 429,
                message: "alcanzo el limite de peticiones"
            })
        }
    })
}