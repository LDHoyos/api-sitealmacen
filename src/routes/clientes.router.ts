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
        this.router.get("/clientes/:id",this.clienteController.getOneCliente)
        this.router.post("/clientes",this.clienteController.createCliente)
        this.router.delete("/clientes/:id",this.clienteController.deleteCliente)
        this.router.patch("/clientes/:id",this.clienteController.deleteClientePatch)
        this.router.patch("/clientes/update/:id",this.clienteController.updateCliente)
    }
}
