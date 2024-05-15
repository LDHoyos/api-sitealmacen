import { Router } from "express";
import { VentasController } from "../controllers/ventas.controller";

export class VentaRoutes{
    private ventasController:VentasController=new VentasController()
    public router=Router()

    constructor(){
       this.initializeRoutes()
    }
    private initializeRoutes(){
        this.router.get("/ventas/test",this.ventasController.test);
        this.router.get("/ventas",this.ventasController.getAllVenta)
        this.router.get("/venta/:id",this.ventasController.getOneVenta)
        this.router.post("/venta",this.ventasController.createVenta)
        this.router.put("/venta/:id",this.ventasController.updateVenta)
        this.router.delete("/venta/:id",this.ventasController.deleteVenta)
    }
}