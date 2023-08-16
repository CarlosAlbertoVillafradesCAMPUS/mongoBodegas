var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose, Transform } from "class-transformer";
export class dtoErrors {
    constructor(data) {
        Object.assign(this, data);
        this.Nombre = "";
        this.Email = "";
        this.Responsable = "";
        this.Descripcion = "";
        this.Email_Verified_At = "";
        this.Estado = "";
        this.Crated_By = "";
        this.Update_By = "";
        this.Image = "";
        this.Password = "";
        this.Created_At = "";
        this.Update_At = "";
        this.Deleted_At = "";
    }
}
__decorate([
    Expose({ name: "nombre" }),
    Transform(({ value }) => { if (value)
        return value = "Error en el parametro de entrada 'Nombre'";
    else
        ""; }),
    __metadata("design:type", String)
], dtoErrors.prototype, "Nombre", void 0);
__decorate([
    Expose({ name: "email" }),
    Transform(({ value }) => { if (value)
        return value = "Error en el parametro de entrada 'Email'";
    else
        ""; }),
    __metadata("design:type", String)
], dtoErrors.prototype, "Email", void 0);
__decorate([
    Expose({ name: "id_responsable" }),
    Transform(({ value }) => { if (value)
        return value = "Error en el parametro de entrada 'Responsable'";
    else
        ""; }),
    __metadata("design:type", String)
], dtoErrors.prototype, "Responsable", void 0);
__decorate([
    Expose({ name: "descripcion" }),
    Transform(({ value }) => { if (value)
        return value = "Error en el parametro de entrada 'Descripcion'";
    else
        ""; }),
    __metadata("design:type", String)
], dtoErrors.prototype, "Descripcion", void 0);
__decorate([
    Expose({ name: "email_verified_at" }),
    Transform(({ value }) => { if (value)
        return value = "Error en el parametro de entrada 'Email_Verified_At'";
    else
        ""; }),
    __metadata("design:type", String)
], dtoErrors.prototype, "Email_Verified_At", void 0);
__decorate([
    Expose({ name: "estado" }),
    Transform(({ value }) => { if (value)
        return value = "Error en el parametro de entrada 'Estado'";
    else
        ""; }),
    __metadata("design:type", String)
], dtoErrors.prototype, "Estado", void 0);
__decorate([
    Expose({ name: "created_by" }),
    Transform(({ value }) => { if (value)
        return value = "Error en el parametro de entrada 'Crated_By'";
    else
        ""; }),
    __metadata("design:type", String)
], dtoErrors.prototype, "Crated_By", void 0);
__decorate([
    Expose({ name: "update_by" }),
    Transform(({ value }) => { if (value)
        return value = "Error en el parametro de entrada 'Update_By'";
    else
        ""; }),
    __metadata("design:type", String)
], dtoErrors.prototype, "Update_By", void 0);
__decorate([
    Expose({ name: "foto" }),
    Transform(({ value }) => { if (value)
        return value = "Error en el parametro de entrada 'Image'";
    else
        ""; }),
    __metadata("design:type", String)
], dtoErrors.prototype, "Image", void 0);
__decorate([
    Expose({ name: "password" }),
    Transform(({ value }) => { if (value)
        return value = "Error en el parametro de entrada 'Password'";
    else
        ""; }),
    __metadata("design:type", String)
], dtoErrors.prototype, "Password", void 0);
__decorate([
    Expose({ name: "created_at" }),
    Transform(({ value }) => { if (value)
        return value = "Error en el parametro de entrada 'Created_At'";
    else
        ""; }),
    __metadata("design:type", String)
], dtoErrors.prototype, "Created_At", void 0);
__decorate([
    Expose({ name: "update_at" }),
    Transform(({ value }) => { if (value)
        return value = "Error en el parametro de entrada 'Update_At'";
    else
        ""; }),
    __metadata("design:type", String)
], dtoErrors.prototype, "Update_At", void 0);
__decorate([
    Expose({ name: "deleted_at" }),
    Transform(({ value }) => { if (value)
        return value = "Error en el parametro de entrada 'Deleted_At'";
    else
        ""; }),
    __metadata("design:type", String)
], dtoErrors.prototype, "Deleted_At", void 0);
