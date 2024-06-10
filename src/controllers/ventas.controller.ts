import { Request, Response } from 'express';
import { where } from 'sequelize/types';

import { Venta, VentaI } from '../models/Venta.model';

export class VentasController {


    public async test(req: Request, res: Response) {
        try {
            res.send('hola, metodo test para Ventas')
        } catch (error) {
            res.status(204).json({ message: ` error is ${error}` })
        }
    }

    public async getAllVenta(req: Request, res: Response) {
        try {
            const ventas: VentaI[] = await Venta.findAll({where:{active:true}}) // select * from Ventas;
            res.status(200).json({ ventas })
        } catch (error) {
            console.error("Error en getAllVenta:", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }
    }

    public async getOneVenta(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const venta: Venta | null = await Venta.findOne({ where: { id,active:true } })

            if (venta) {
                res.status(200).json(venta)
            } else return res.status(300).json({ mensaje: "El venta no existe" })

        } catch (error) {
            console.error("Error en getOneVenta:", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }

    }

    public async createVenta(req: Request, res: Response) {
        const {
            fechaVenta,
            subtotal,
            impuestos,
            descuentos,
            total,
            ClienteId

        } = req.body;

        try {
            let body: VentaI = {
                fechaVenta,
                subtotal,
                impuestos,
                descuentos,
                total,
                ClienteId,
                active:true
            }

            const venta: VentaI = await Venta.create({ ...body });
            res.status(200).json({ venta });

        } catch (error) {
            console.error("Error en createVenta:", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }

    }

    public async deleteVenta(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const VentaExist: VentaI | null = await Venta.findByPk(id);
            if (!VentaExist) return res.status(500).json({ msg: "El Venta No existe" })
            await Venta.destroy(
                {
                    where: { id,active:true }
                }
            )
            const venta: VentaI | null = await Venta.findByPk(id);
        if (Venta) res.status(200).json({ msg: "Venta Eliminado" })
        } catch (error) {

        }

    }

    public async deleteVentaPatch(req: Request, res: Response) {
        const { id } = req.params;
    
        try {
            const VentaExist: VentaI | null = await Venta.findByPk(id);
            if (!VentaExist) {
                return res.status(500).json({ msg: "El Venta No existe" });
            }
    
            // Eliminación suave: Establece 'active' en false
            await Venta.update({ active: false }, { where: { id } });
    
            res.status(200).json({ msg: "Venta ocultada (eliminación suave)" });
        } catch (error) {
            console.error("Error en deleteVenta:", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }
    }
    
    public async updateVenta(req: Request, res: Response) {
        const { id } = req.params;

        const {
            //id,
            fechaVenta,
            subtotal,
            impuestos,
            descuentos,
            total,
            ClienteId
        } = req.body

        try {
            let body: VentaI = {
                fechaVenta,
                subtotal,
                impuestos,
                descuentos,
                total,
                ClienteId,
                active:true
            }

            const VentaExist: VentaI | null = await Venta.findByPk(id)
            // const userExist: UsuarioI | null = await Usuario.findOne(
            //     {
            //         where: { id: pk}
            //     }
            // );

            if (!VentaExist) return res.status(500).json({ msg: "El Venta No existe" })
            await Venta.update(
                body, {
                where: { id }
            }
            );  // select update from usuarios where id=pk



        } catch (error) {

        }
        const venta: VentaI | null = await Venta.findByPk(id);
        if (Venta) return res.status(200).json({ venta })

    }
}
