import { DataTypes, Model } from "sequelize";
import { database } from "../database/db";

export class Producto extends Model {
    public nombre!: string;
    public marca!: string;
    public precio!: number;
    public stockMin!: number;
    public cantidad!: number;
    public TipoProductoId!:number;
    public active!:boolean;
}

export class TipoProducto extends Model {
    public name!: string;
    public active!:boolean;
}

export interface ProductoI {
    nombre: string;
    marca: string;
    precio: number;
    stockMin: number;
    cantidad: number;
    TipoProductoId:number;
    active:boolean;
}

export interface TipoProductoI {
    name: string;
    active:boolean;
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
        },
        active:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
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
        },
        active:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
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