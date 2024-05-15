import { DataTypes, Model } from "sequelize";
import { database } from "../database/db";

export class Producto extends Model {
    public nombre!: string;
    public marca!: string;
    public precio!: number;
    public stockMin!: number;
    public cantidad!: number;
    public TipoProductoId!:number;
}

export class TipoProducto extends Model {
    public name!: string;
}

export interface ProductoI {
    nombre: string;
    marca: string;
    precio: number;
    stockMin: number;
    cantidad: number;
    TipoProductoId:number;
}

export interface TipoProductoI {
    name: string;
}


Producto.init(
    {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        marca:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        precio:{
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        stockMin:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cantidad:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        sequelize: database,
        tableName: "producto",
        timestamps: true
    }
)

TipoProducto.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize: database,
        tableName: "tipo_producto",
        timestamps: true
    }
)

TipoProducto.hasMany(Producto)
Producto.belongsTo(TipoProducto)