var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose } from "class-transformer";
import { IsDefined, IsOptional } from "class-validator";
export class dtoProductos {
    constructor(data) {
        Object.assign(this, data);
        this.nombre = "";
        this.descripcion = "";
        this.estado = 0;
        this.created_by = 0;
        this.update_by = 0;
        this.created_at = "";
        this.update_at = "";
        this.deleted_at = "";
    }
}
__decorate([
    Expose({ name: "Nombre" }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro 'Nombre' es obligatorio" }; } }),
    __metadata("design:type", String)
], dtoProductos.prototype, "nombre", void 0);
__decorate([
    Expose({ name: "Descripcion" }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro 'Descripcion' es obligatorio" }; } }),
    __metadata("design:type", String)
], dtoProductos.prototype, "descripcion", void 0);
__decorate([
    Expose({ name: "Estado" }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro 'Estado' es obligatorio" }; } }),
    __metadata("design:type", Number)
], dtoProductos.prototype, "estado", void 0);
__decorate([
    Expose({ name: "Created_By" }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro 'Created_By' es obligatorio" }; } }),
    __metadata("design:type", Number)
], dtoProductos.prototype, "created_by", void 0);
__decorate([
    Expose({ name: "Update_By" }),
    __metadata("design:type", Number)
], dtoProductos.prototype, "update_by", void 0);
__decorate([
    Expose({ name: "Created_At" }),
    IsOptional(),
    __metadata("design:type", String)
], dtoProductos.prototype, "created_at", void 0);
__decorate([
    Expose({ name: "Update_At" }),
    IsOptional(),
    __metadata("design:type", String)
], dtoProductos.prototype, "update_at", void 0);
__decorate([
    Expose({ name: "Deleted_At" }),
    IsOptional(),
    __metadata("design:type", String)
], dtoProductos.prototype, "deleted_at", void 0);
//"nombre", "descripcion", "estado","created_by","update_by", "created_at", "update_at", "deleted_at"
