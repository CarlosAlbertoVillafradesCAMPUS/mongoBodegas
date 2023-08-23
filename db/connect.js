import {MongoClient} from "mongodb";
import dotenv from "dotenv";

dotenv.config()
let my_conexion = JSON.parse(process.env.MY_CONEXION)

export const conAtlas = async() =>{
    try {
        let uri = `mongodb+srv://${my_conexion.user}:${my_conexion.password}@cluster0.oj8cvn0.mongodb.net/`;
        const options = {
            wtimeout: 2500,
            connectTimeoutMS: 10000,
            useNewUrlParser: true,
            useUnifiedTopology: true,
          };
        let client = await MongoClient.connect(uri, options)
        return client

    } catch (error) {
        return {status:500, message:"Error en la conexion"}
    }
}

export const conexion = async() =>{
    try {
        let uri = `mongodb+srv://${my_conexion.user}:${my_conexion.password}@cluster0.oj8cvn0.mongodb.net/${my_conexion.dbName}`;
        let options = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        let client = await MongoClient.connect(uri, options)
        return client.db()

    } catch (error) {
        return {status:500, message:"Error en la conexion"}
    }
} 