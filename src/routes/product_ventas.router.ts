import { Router } from "express";
import { ProductoVentaController } from "../controllers/productVentas.controller";

export class ProductoVentaRoutes{
    public productoVentaController:ProductoVentaController=new ProductoVentaController()
    public router=Router()
    constructor(){
        this.initializeRoutes()
    }

    private initializeRoutes(){
        this.router.get("/productos_Ventas/test",this.productoVentaController.test)
        this.router.get("/productos_ventas",this.productoVentaController.getAllVentaProducto)
        this.router.get("/productos_venta/:producto_id/:venta_id",this.productoVentaController.getOneVentaProducto)
        this.router.get("/productos_ventas/productos/:producto_id",this.productoVentaController.getAllProductoV)
        this.router.get("/productos_ventas/ventas/:venta_id",this.productoVentaController.getAllVentasP)
        this.router.post("/productos_venta",this.productoVentaController.createVentaProducto)
        this.router.put("/productos_venta/:producto_id/:venta_id",this.productoVentaController.updateVenta)
        this.router.delete("/productos_venta/:producto_id/:venta_id",this.productoVentaController.deleteVentaProducto)

    }
}