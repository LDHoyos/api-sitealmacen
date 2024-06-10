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
        this.router.get("/ventas/:id",this.ventasController.getOneVenta)
        this.router.post("/ventas",this.ventasController.createVenta)
        this.router.patch("/ventas/update/:id",this.ventasController.updateVenta)
        this.router.delete("/ventas/:id",this.ventasController.deleteVenta)
        this.router.patch("/ventas/:id",this.ventasController.deleteVentaPatch)
    }
}