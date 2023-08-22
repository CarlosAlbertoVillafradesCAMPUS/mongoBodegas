import {Expose, Transform} from "class-transformer";
import {IsDefined, IsOptional} from "class-validator";

export class dtoBodegas{
    @Expose({name:"Nombre"})
    @IsDefined({message: ()=>{throw {status:422, message:"El parametro 'Nombre' es obligatorio"}}})
    nombre:string

    @Expose({name:"Responsable"})
    @IsDefined({message: ()=>{throw {status:422, message:"El parametro 'Responsable' es obligatorio"}}})
    id_responsable:number

    @Expose({name:"Estado"})
    @IsDefined({message: ()=>{throw {status:422, message:"El parametro 'Estado' es obligatorio"}}})
    estado:number

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

    constructor(data: Partial<dtoBodegas>){
        Object.assign(this, data);
        this.nombre="";
        this.id_responsable=0;
        this.estado=0;
        this.created_by=0;
        this.update_by=0;
        this.created_at=null;
        this.update_at=null;
        this.deleted_at=null; 
    }
}

//"nombre", "descripcion", "estado","created_by","update_by", "created_at", "update_at", "deleted_at"