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
export class dtoHistoriales {
    constructor(data) {
        Object.assign(this, data);
        this.cantidad = 0;
        this.id_bodega_origen = 0;
        this.id_bodega_destino = 0;
        this.id_inventario = 0;
        this.estado = 0;
        this.created_by = 0;
        this.update_by = 0;
        this.created_at = null;
        this.update_at = null;
        this.deleted_at = null;
        this.id_producto = 0;
    }
}
__decorate([
    Expose({ name: "Cantidad" }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro 'Cantidad' es obligatorio" }; } }),
    __metadata("design:type", Number)
], dtoHistoriales.prototype, "cantidad", void 0);
__decorate([
    Expose({ name: "Id_Bodega_Origen" }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro 'Id_Bodega_Origen' es obligatorio" }; } }),
    __metadata("design:type", Number)
], dtoHistoriales.prototype, "id_bodega_origen", void 0);
__decorate([
    Expose({ name: "Id_Bodega_Destino" }),
    IsDefined({ message: () => { throw { status: 422, message: "El parametro 'Id_Bodega_Destino' es obligatorio" }; } }),
    __metadata("design:type", Number)
], dtoHistoriales.prototype, "id_bodega_destino", void 0);
__decorate([
    Expose({ name: "Id_Inventario" }),
    __metadata("design:type", Number)
], dtoHistoriales.prototype, "id_inventario", void 0);
__decorate([
    Expose({ name: "Estado" }),
    __metadata("design:type", Number)
], dtoHistoriales.prototype, "estado", void 0);
__decorate([
    Expose({ name: "Created_By" }),
    __metadata("design:type", Number)
], dtoHistoriales.prototype, "created_by", void 0);
__decorate([
    Expose({ name: "Update_By" }),
    __metadata("design:type", Number)
], dtoHistoriales.prototype, "update_by", void 0);
__decorate([
    Expose({ name: "Created_At" }),
    IsOptional(),
    __metadata("design:type", Date)
], dtoHistoriales.prototype, "created_at", void 0);
__decorate([
    Expose({ name: "Update_At" }),
    IsOptional(),
    __metadata("design:type", Date)
], dtoHistoriales.prototype, "update_at", void 0);
__decorate([
    Expose({ name: "Deleted_At" }),
    IsOptional(),
    __metadata("design:type", Date)
], dtoHistoriales.prototype, "deleted_at", void 0);
__decorate([
    Expose({ name: "Id_Producto" }),
    __metadata("design:type", Number)
], dtoHistoriales.prototype, "id_producto", void 0);
//"cantidad","id_bodega_origen", "id_bodega_destino", "id_inventario" ,"estado","created_by"
