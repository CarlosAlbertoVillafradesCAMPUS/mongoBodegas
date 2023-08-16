import {Expose, Transform} from "class-transformer";
import {IsEmpty} from "class-validator";

export class dtoErrorsUsers{
    @Expose({name:"nombre"})
    @Transform(({ value }) => { if(value)  return value = "Error en el parametro de entrada 'Nombre'" ; else ""})
    Nombre:string

    @Expose({name:"email"})
    @Transform(({ value }) => { if(value)  return value = "Error en el parametro de entrada 'Email'" ; else ""})
    Email:string

    @Expose({name:"email_verified_at"})
    @Transform(({ value }) => { if(value)  return value = "Error en el parametro de entrada 'Email_Verified_At'" ; else ""})
    Email_Verified_At:string

    @Expose({name:"estado"})
    @Transform(({ value }) => { if(value)  return value = "Error en el parametro de entrada 'Estado'" ; else ""})
    Estado:string
    
    @Expose({name:"created_by"})
    @Transform(({ value }) => { if(value)  return value = "Error en el parametro de entrada 'Crated_By'" ; else ""})
    Crated_By:string

    @Expose({name:"update_by"})
    @Transform(({ value }) => { if(value)  return value = "Error en el parametro de entrada 'Update_By'" ; else ""})
    Update_By:string 

    @Expose({name:"foto"})
    @Transform(({ value }) => { if(value)  return value = "Error en el parametro de entrada 'Image'" ; else ""})
    Image:string  

    @Expose({name:"password"})
    @Transform(({ value }) => { if(value)  return value = "Error en el parametro de entrada 'Password'" ; else ""})
    Password:string 

    @Expose({name:"created_at"})
    @Transform(({ value }) => { if(value)  return value = "Error en el parametro de entrada 'Created_At'" ; else ""})
    Created_At:string 

    @Expose({name:"update_at"})
    @Transform(({ value }) => { if(value)  return value = "Error en el parametro de entrada 'Update_At'" ; else ""})
    Update_At:string 

    @Expose({name:"deleted_at"})
    @Transform(({ value }) => { if(value)  return value = "Error en el parametro de entrada 'Deleted_At'" ; else ""})
    Deleted_At:string 

    constructor(data: Partial<dtoErrorsUsers>){
        Object.assign(this, data);
        this.Nombre="";
        this.Email="";
        this.Email_Verified_At="";
        this.Estado="";
        this.Crated_By="";
        this.Update_By="";
        this.Image="";
        this.Password="";
        this.Created_At="";
        this.Update_At="";
        this.Deleted_At=""; 
    }
}
