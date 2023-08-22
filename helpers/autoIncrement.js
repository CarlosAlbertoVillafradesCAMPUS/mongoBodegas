import {conexion} from "../db/connect.js"

export const autoIncrement = async (colleccionName) =>{
    const db = await conexion();
    const coleccion = db.collection("counters");
    const resultado = await coleccion.findOneAndUpdate(
        { ID: `${colleccionName}ID` },
        { $inc: { sequenceValue: 1 } },
        { returnDocument: "after" }
    );

    return resultado.value.sequenceValue;

}