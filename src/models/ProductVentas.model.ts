import { Model, DataType, DataTypes } from "sequelize";
import { database } from "../database/db";
import { Cliente } from "./Cliente.model";
import { Producto } from "./Producto.model";
import { Venta } from "./Venta.model";

export class Venta_Producto extends Model {
    public cantidad!: number;
    public precio!: number;
    public total!: number;
    public producto_id!:number;
    public venta_id!:number;
    public active!:boolean;
}

export interface Venta_ProductoI {
    cantidad: number;
    precio: number;
    total: number;
    producto_id:number;
    venta_id:number;
    active:boolean;
}

Venta_Producto.init({
    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    active:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
      }
}, {
    tableName: 'ventas_productos',
    sequelize: database,
    timestamps: true,
});

Producto.belongsToMany(Venta, { through: Venta_Producto, foreignKey: 'producto_id', otherKey: 'venta_id' });
Venta.belongsToMany(Producto, { through: Venta_Producto, foreignKey: 'venta_id', otherKey: 'producto_id' });
