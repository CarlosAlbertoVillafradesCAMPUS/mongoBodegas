import {Expose, Transform} from "class-transformer";
import {IsDefined, IsOptional} from "class-validator";

export class dtoInventarios{
    @Expose({name:"Id_Bodega"})
    @IsDefined({message: ()=>{throw {status:422, message:"El parametro 'Id_Bodega' es obligatorio"}}})
    id_bodega:string

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

    constructor(data: Partial<dtoInventarios>){
        Object.assign(this, data);
        this.id_bodega="";
        this.id_producto=0;
        this.cantidad=0;
        this.created_by=0;
        this.update_by=0;
        this.created_at=null;
        this.update_at=null;
        this.deleted_at=null; 
    }
}

//"id_bodega", "id_producto", "cantidad","created_by"