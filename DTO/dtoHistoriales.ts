import {Expose, Transform} from "class-transformer";
import {IsDefined, IsOptional} from "class-validator";

export class dtoHistoriales{

    @Expose({name:"Cantidad"})
    @IsDefined({message: ()=>{throw {status:422, message:"El parametro 'Cantidad' es obligatorio"}}})
    cantidad:number

    @Expose({name:"Id_Bodega_Origen"})
    @IsDefined({message: ()=>{throw {status:422, message:"El parametro 'Id_Bodega_Origen' es obligatorio"}}})
    id_bodega_origen:number

    @Expose({name:"Id_Bodega_Destino"})
    @IsDefined({message: ()=>{throw {status:422, message:"El parametro 'Id_Bodega_Destino' es obligatorio"}}})
    id_bodega_destino:number

    @Expose({name:"Id_Inventario"})
    id_inventario:number

    @Expose({name:"Estado"})
    estado:number

    @Expose({name:"Created_By"})
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

    @Expose({name:"Id_Producto"})
    id_producto:number

    constructor(data: Partial<dtoHistoriales>){
        Object.assign(this, data);
        this.cantidad=0;
        this.id_bodega_origen=0;
        this.id_bodega_destino=0;
        this.id_inventario=0;
        this.estado=0;
        this.created_by=0;
        this.update_by=0;
        this.created_at=null;
        this.update_at=null;
        this.deleted_at=null;
        this.id_producto = 0; 
    }
}

//"cantidad","id_bodega_origen", "id_bodega_destino", "id_inventario" ,"estado","created_by"