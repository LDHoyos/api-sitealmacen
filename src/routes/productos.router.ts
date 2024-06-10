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
        this.router.get("/productos/:id",this.productoController.getOneCliente)
        this.router.post("/productos",this.productoController.createProducto)
        this.router.put("/productos/:id",this.productoController.updateProducto)
        this.router.delete("/productos/:id",this.productoController.deleteProducto)
        this.router.patch("/productos/:id",this.productoController.deleteProductoPatch)
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
        this.router.get("/tipo_productos/:id",this.tipoProductoController.getOneCliente)
        this.router.post("/tipo_productos",this.tipoProductoController.createTipoProducto)
        this.router.put("/tipo_productos/:id",this.tipoProductoController.updateTipoProducto)
        this.router.delete("/tipo_productos/:id",this.tipoProductoController.deleteTipoProducto)
    }
}