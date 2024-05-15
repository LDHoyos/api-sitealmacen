import {  Request, Response } from 'express';

import { TipoProducto, TipoProductoI } from '../models/Producto.model';

export class TipoProductoController {


    public async test(req: Request, res:Response){
        try {
            res.send('hola, metodo test para tipo producto')
        } catch (error) {
            res.status(204).json({message:` error is ${error}`})
        }
    }

    public async getAllTipoProducto(req: Request, res: Response) {
        try {
            const tipoProducto: TipoProductoI[] = await TipoProducto.findAll();

            res.json({ tipoProducto });
        } catch (error) {
            console.error("Error en getAllTipoProducto:", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }
        
    }
    public async getOneCliente(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const tipoProducto: TipoProductoI | null = await TipoProducto.findOne({ where: { id } })

            if (tipoProducto) {
                res.status(200).json(tipoProducto)
            } else return res.status(300).json({ mensaje: "El TipoProducto no existe" })

        } catch (error) {
            console.error("Error en getOneTipoProducto:", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }

    }

    public async createTipoProducto(req: Request, res: Response) {
        const {
           name
        } = req.body;

        try {
            let body: TipoProductoI = {
                name
            }

            const tipoProducto: TipoProductoI = await TipoProducto.create({ ...body });
            res.status(200).json({ tipoProducto });

        } catch (error) {
            console.error("Error en createTipoProducto:", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }

    }

    public async deleteTipoProducto(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const tipoProductoExist: TipoProductoI | null = await TipoProducto.findByPk(id);
            if (!tipoProductoExist) return res.status(500).json({ msg: "El TipoProducto No existe" })
            await TipoProducto.destroy(
                {
                    where: { id }
                }
            )
            res.status(200).json({ msg: "TipoProducto Eliminado" })
        } catch (error) {

        }

    }
    public async updateTipoProducto(req: Request, res: Response) {
        const { id } = req.params;

        const {
            //id,
            name
        } = req.body

        try {
            let body: TipoProductoI = {
                name
            }

            const tipoProductoExist: TipoProductoI | null = await TipoProducto.findByPk(id)
            // const userExist: UsuarioI | null = await Usuario.findOne(
            //     {
            //         where: { id: pk}
            //     }
            // );

            if (!tipoProductoExist) return res.status(500).json({ msg: "El TipoProducto No existe" })
            await TipoProducto.update(
                body, {
                where: { id }
            }
            );  // select update from usuarios where id=pk

        } catch (error) {

        }
        const tipoProducto: TipoProductoI | null = await TipoProducto.findByPk(id);
        if (TipoProducto) return res.status(200).json({ tipoProducto })

    }
    
}
