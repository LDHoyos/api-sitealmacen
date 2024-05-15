import { Router } from "express";
import { ProductoController } from "../controllers/productos.controller";
import { TipoProductoController } from "../controllers/tipoProducto.controlller";

export class ProductoRoutes{
    public productoController:ProductoController=new ProductoController()
    public router=Router()
    constructor(){
        this.initializeRoutes()
    }

    private initializeRoutes(){
        this.router.get("/productos/test",this.productoController.test)
        this.router.get("/productos",this.productoController.getAllProducto)
        this.router.get("/producto/:id",this.productoController.getOneCliente)
        this.router.post("/producto",this.productoController.createProducto)
        this.router.put("/producto/:id",this.productoController.updateProducto)
        this.router.delete("/producto/:id",this.productoController.deleteProducto)
    }
}


export class TipoProductoRoutes{
    public tipoProductoController:TipoProductoController=new TipoProductoController()
    public router=Router()
    constructor(){
        this.initializeRoutes()
    }

    private initializeRoutes(){
        this.router.get("/tipo_productos/test",this.tipoProductoController.test)
        this.router.get("/tipo_productos",this.tipoProductoController.getAllTipoProducto)
        this.router.get("/tipo_producto/:id",this.tipoProductoController.getOneCliente)
        this.router.post("/tipo_producto",this.tipoProductoController.createTipoProducto)
        this.router.put("/tipo_producto/:id",this.tipoProductoController.updateTipoProducto)
        this.router.delete("/tipo_producto/:id",this.tipoProductoController.deleteTipoProducto)
    }
}