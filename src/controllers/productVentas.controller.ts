import { Request, Response } from 'express';

import { Venta_Producto, Venta_ProductoI } from '../models/ProductVentas.model';

export class ProductoVentaController {


    public async test(req: Request, res: Response) {
        try {
            res.send('hola, metodo test para venta producto')
        } catch (error) {
            res.status(204).json({ message: ` error is ${error}` })
        }
    }

    public async getAllVentaProducto(req: Request, res: Response) {
        try {
            const ventas_producto: Venta_ProductoI[] = await Venta_Producto.findAll();

            res.json({ ventas_producto });
        } catch (error) {
            console.error("Error en getAllVentaProducto:", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }

    }
    public async getOneVentaProducto(req: Request, res: Response) {
        try {
            const { producto_id, venta_id } = req.params;
            let venta_producto: Venta_ProductoI | null = await Venta_Producto.findOne({ where: { producto_id, venta_id }  })

            if (venta_producto) {
                res.status(200).json(venta_producto)
            } else return res.status(300).json({ mensaje: "la venta producto no existe" })

        } catch (error) {
            console.error("Error en getOneVentaProducto:", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }

    }

    public async getAllProductoV(req: Request, res: Response) {
        try {
            const { producto_id } = req.params;
            let productoV: Venta_ProductoI[] | null = await Venta_Producto.findAll({ where: { producto_id }  })

            if (productoV) {
                res.status(200).json({productoV})
            } else return res.status(300).json({ mensaje: "productos no existe" })

        } catch (error) {
            console.error("Error en getAllProductosV:", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }

    }

    public async getAllVentasP(req: Request, res: Response) {
        try {
            const { venta_id } = req.params;
            let ventasP: Venta_ProductoI[] | null = await Venta_Producto.findAll({ where: { venta_id }  })

            if (ventasP) {
                res.status(200).json({ventasP})
            } else return res.status(300).json({ mensaje: "ventas no existe" })

        } catch (error) {
            console.error("Error en getAllVentasP:", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }

    }

    public async createVentaProducto(req: Request, res: Response) {
        const {
            cantidad,
            precio,
            total,
            venta_id,
            producto_id
        } = req.body;

        try {
            let body: Venta_ProductoI = {
                cantidad,
                precio,
                total,
                venta_id,
                producto_id
            }

            const venta_producto: Venta_ProductoI = await Venta_Producto.create({ ...body });
            res.status(200).json({ venta_producto });

        } catch (error) {
            console.error("Error en createVentaProducto:", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }

    }

    public async deleteVentaProducto(req: Request, res: Response) {
        const {producto_id:p_key,venta_id:v_key} = req.params;

        try {
            const venta_productoExist: Venta_ProductoI | null = await Venta_Producto.findOne({where:{producto_id:p_key,venta_id:v_key}})

            if (!venta_productoExist) return res.status(500).json({ msg: "El Venta Producto No existe" })
            await Venta_Producto.destroy(
                {
                    where: {producto_id:p_key,venta_id:v_key}
                }
            )
            res.status(200).json({ msg: "Venta Producto Eliminado" })
        } catch (error) {

        }

    }
    public async updateVenta(req: Request, res: Response) {
        const { producto_id:p_key, venta_id:v_key } = req.params;

        const {
            //id,
            cantidad,
            precio,
            total,
            venta_id,
            producto_id
        } = req.body

        try {
            let body: Venta_ProductoI = {
                cantidad,
                precio,
                total,
                venta_id,
                producto_id
            }

            const venta_ProductoExist: Venta_ProductoI | null = await Venta_Producto.findOne({where:{producto_id:p_key,venta_id:v_key}})

            if (!venta_ProductoExist) return res.status(500).json({ msg: "la Venta Producto No existe" })
            await Venta_Producto.update(
                body, {
                where: {producto_id:p_key,venta_id:v_key}
            }
            );  // select update from usuarios where id=pk



        } catch (error) {

        }
        const venta_producto: Venta_ProductoI | null = await Venta_Producto.findOne({where:{producto_id:p_key,venta_id:v_key}})

        if (venta_producto) return res.status(200).json({ venta_producto })

    }

}
