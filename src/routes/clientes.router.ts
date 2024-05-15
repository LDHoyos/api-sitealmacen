import { Router } from "express";

import { ClienteController } from '../controllers/cliente.controller';

export class ClienteRoutes {

    public clienteController: ClienteController = new ClienteController();
    public router = Router()

    constructor() {
       this.initializeRoutes()
    }

    private initializeRoutes(){
        this.router.get("/clientes/test", this.clienteController.test)
        this.router.get("/clientes",this.clienteController.getAllCliente)
        this.router.get("/cliente/:id",this.clienteController.getOneCliente)
        this.router.post("/cliente",this.clienteController.createCliente)
        this.router.delete("/cliente/:id",this.clienteController.deleteCliente)
        this.router.put("/cliente/:id",this.clienteController.updateCliente)
    }
}
