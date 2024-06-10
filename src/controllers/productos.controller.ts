import {  Request, Response } from 'express';

import { Producto, ProductoI } from '../models/Producto.model';

export class ProductoController {


    public async test(req: Request, res:Response){
        try {
            res.send('hola, metodo test para producto')
        } catch (error) {
            res.status(204).json({message:` error is ${error}`})
        }
    }

    public async getAllProducto(req: Request, res: Response) {
        try {
            const producto: ProductoI[] = await Producto.findAll({where:{active:true}});

            res.json({ producto });
        } catch (error) {
            console.error("Error en getAllProducto:", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }
        
    }

    public async getOneCliente(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const producto: Producto | null = await Producto.findOne({ where: { id,active:true } })

            if (producto) {
                res.status(200).json(producto)
            } else return res.status(300).json({ mensaje: "El Producto no existe" })

        } catch (error) {
            console.error("Error en getOneProducto:", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }

    }

    public async createProducto(req: Request, res: Response) {
        const {
            nombre,
            marca,
            precio,
            stockMin,
            cantidad,
            TipoProductoId

        } = req.body;

        try {
            let body: ProductoI = {
                nombre,
                marca,
                precio,
                stockMin,
                cantidad,
                TipoProductoId,
                active:true
            }

            const producto: ProductoI = await Producto.create({ ...body });
            res.status(200).json({ producto });

        } catch (error) {
            console.error("Error en createProducto:", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }

    }

    public async deleteProducto(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const productoExist: ProductoI | null = await Producto.findByPk(id);
            if (!productoExist) return res.status(500).json({ msg: "El Producto No existe" })
            await Producto.destroy(
                {
                    where: { id,active:true }
                }
            )
        const producto: ProductoI | null = await Producto.findByPk(id);
        if (producto) return res.status(200).json({ msg: "Producto Eliminado",producto })
        } catch (error) {

        }

    }
    public async deleteProductoPatch(req: Request, res: Response) {
        const { id } = req.params;
    
        try {
            const productoExist: ProductoI | null = await Producto.findByPk(id);
            if (!productoExist) {
                return res.status(500).json({ msg: "El Producto No existe" });
            }
    
            // Eliminación suave: Establece 'active' en false
            await Producto.update({ active: false }, { where: { id } });

            const producto: ProductoI | null = await Producto.findByPk(id);
        if (producto) return res.status(200).json({ msg: "Producto ocultado (eliminación suave)" });
        } catch (error) {
            console.error("Error en deleteProducto:", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }
    }
    
    public async updateProducto(req: Request, res: Response) {
        const { id } = req.params;

        const {
            //id,
            nombre,
            marca,
            precio,
            stockMin,
            cantidad,
            TipoProductoId
        } = req.body

        try {
            let body: ProductoI = {
                nombre,
                marca,
                precio,
                stockMin,
                cantidad,
                TipoProductoId,
                active:true
            }

            const productoExist: ProductoI | null = await Producto.findByPk(id)
            // const userExist: UsuarioI | null = await Usuario.findOne(
            //     {
            //         where: { id: pk}
            //     }
            // );

            if (!productoExist) return res.status(500).json({ msg: "El Producto No existe" })
            await Producto.update(
                body, {
                where: { id }
            }
            );  // select update from usuarios where id=pk



        } catch (error) {

        }
        const producto: ProductoI | null = await Producto.findByPk(id);
        if (producto) return res.status(200).json({ producto })

    }
    
}
