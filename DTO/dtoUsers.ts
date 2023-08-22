import {Expose, Transform} from "class-transformer";
import {IsDefined, IsOptional} from "class-validator";

export class dtoUsers{
    @Expose({name:"Nombre"})
    @IsDefined({message: ()=>{throw {status:422, message:"El parametro 'Nombre' es obligatorio"}}})
    nombre:string

    @Expose({name:"Email"})
    @IsDefined({message: ()=>{throw {status:422, message:"El parametro 'Email' es obligatorio"}}})
    email:string

    @Expose({name:"Email_Verified_At"})
    @Transform(({ value }) => { if(value === null) return new Date() ; else new Date(value)})
    email_verified_at:string

    @Expose({name:"Estado"})
    @IsDefined({message: ()=>{throw {status:422, message:"El parametro 'Estado' es obligatorio"}}})
    estado:number

    @Expose({name:"Created_By"})
    @IsDefined({message: ()=>{throw {status:422, message:"El parametro 'Created_By' es obligatorio"}}})
    created_by:number

    @Expose({name:"Update_By"})
    update_by:number

    @Expose({name:"Image"})
    @Transform(({ value }) => { if(value) return value ; else ""})
    foto:string

    @Expose({name:"Password"})
    @IsDefined({message: ()=>{throw {status:422, message:"El parametro 'Password' es obligatorio"}}})
    password:string

    @Expose({name:"Created_At"})
    @IsOptional()
    created_at:Date

    @Expose({name:"Update_At"})
    @IsOptional()    
    update_at:Date

    @Expose({name:"Deleted_At"})
    @IsOptional()
    deleted_at:Date

    constructor(data: Partial<dtoUsers>){
        Object.assign(this, data);
        this.nombre="";
        this.email="";
        this.email_verified_at="";
        this.estado=0;
        this.created_by=0;
        this.update_by=0;
        this.foto="";
        this.password="";
        this.created_at=null;
        this.update_at=null;
        this.deleted_at=null; 
    }
}

//"nombre", "email", "email_verified_at", "estado","created_by","update_by","password", "created_at", "update_at", "deleted_at"