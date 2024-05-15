import { Model, DataType, DataTypes } from "sequelize";
import { database } from "../database/db";
import { Cliente } from "./Cliente.model";

export class Venta extends Model {
    public fechaVenta!: Date;
    public subtotal!: number;
    public impuestos!: number;
    public descuentos!: number;
    public total!: number;
    public ClienteId!:number
}

export interface VentaI {
    fechaVenta: Date;
    subtotal: number;
    impuestos: number;
    descuentos: number;
    total: number;
    ClienteId:number;
}

Venta.init({
    fechaVenta: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    subtotal: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    impuestos: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    descuentos: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'ventas',
    sequelize: database,
    timestamps: true,
});

Venta.belongsTo(Cliente);
Cliente.hasMany(Venta);