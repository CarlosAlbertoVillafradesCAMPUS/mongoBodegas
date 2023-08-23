import {Expose, Transform} from "class-transformer";
import {IsDefined, IsOptional} from "class-validator";

export class dtoInventarios{
    @Expose({name:"Id_Bodega"})
    @IsDefined({message: ()=>{throw {status:422, message:"El parametro 'Id_Bodega' es obligatorio"}}})
    id_bodega:number

    @Expose({name:"Id_Producto"})
    @IsDefined({message: ()=>{throw {status:422, message:"El parametro 'Id_Producto' es obligatorio"}}})
    id_producto:number

    @Expose({name:"Cantidad"})
    @IsDefined({message: ()=>{throw {status:422, message:"El parametro 'Cantidad' es obligatorio"}}})
    cantidad:number

    @Expose({name:"Created_By"})
    @IsDefined({message: ()=>{throw {status:422, message:"El parametro 'Created_By' es obligatorio"}}})
    created_by:number

    @Expose({name:"Update_By"})
    update_by:number

    @Expose({name:"Created_At"})
    @IsOptional()
    created_at:Date

    @Expose({name:"Update_At"})
    @IsOptional()    
    update_at:Date

    @Expose({name:"Deleted_At"})
    @IsOptional()
    deleted_at:Date

    @Expose({name:"Id_Bodega_Origen"})
    id_bodega_origen:number

    @Expose({name:"Id_Bodega_Destino"})
    id_bodega_destino:number

    constructor(data: Partial<dtoInventarios>){
        Object.assign(this, data);
        this.id_bodega=0;
        this.id_producto=0;
        this.cantidad=0;
        this.created_by=0;
        this.update_by=0;
        this.created_at=null;
        this.update_at=null;
        this.deleted_at=null; 
        this.id_bodega_origen=0;
        this.id_bodega_destino=0;
    }
}

//"id_bodega", "id_producto", "cantidad","created_by"