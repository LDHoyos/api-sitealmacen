import {  Request, Response } from 'express';
import bcrypt from 'bcryptjs'
import { Cliente, ClienteI } from '../models/Cliente.model';

export class ClienteController {


    public async test(req: Request, res:Response){
        try {
            res.send('hola, metodo test para Cliente')
        } catch (error) {
            res.status(204).json({message:` error is ${error}`})
        }
    }

    public async getAllCliente(req: Request, res: Response) {
        try {
            const clientes: ClienteI[] = await Cliente.findAll({where:{active:true}});

            res.status(200).json( clientes );
        } catch (error) {
            console.error("Error en getAllCliente:", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }
        
    }
    public async getOneCliente(req: Request, res: Response) {
        try {
            const {id}=req.params;
            const cliente: ClienteI | null = await Cliente.findOne({where:{id,active:true}})

            if (cliente){
                res.status(200).json(cliente)
            } else return  res.status(300).json({mensaje: "El Cliente no existe"})

        } catch (error) {
            console.error("Error en getAllCliente:", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }
        
    }
    public async createCliente(req: Request, res: Response) {
        const {
            nombreCliente,
            direccionCliente,
            telefonoCliente,
            correoCliente,
            passwordCliente
        } = req.body;
    
        try {
            const hashedPassword = await bcrypt.hash(passwordCliente, 10);
    
            let body: ClienteI = {
                nombreCliente,
                direccionCliente,
                telefonoCliente,
                correoCliente,
                passwordCliente: hashedPassword,
                active: true
            };
    
            const cliente: ClienteI = await Cliente.create({ ...body });
            res.status(200).json({ cliente });
        } catch (error) {
            console.error("Error en createCliente:", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }
    }
    public async deleteClientePatch(req: Request, res: Response) {
        const { id } = req.params;
    
        try {
            const clienteExist: ClienteI | null = await Cliente.findByPk(id);
            if (!clienteExist) {
                return res.status(500).json({ msg: "El Cliente No existe" });
            }
    
            // Soft delete: Set 'active' to false
            await Cliente.update({ active: false }, { where: { id } });
            const cliente: ClienteI | null = await Cliente.findByPk(id);
            if(cliente) return res.status(200).json({ msg: "Cliente ocultado (soft-deleted)" ,cliente});
        } catch (error) {
            console.error("Error en deleteCliente:", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }
    }
    
    public async deleteCliente(req: Request, res:Response){
        const { id } = req.params;

        try {
            const clienteExist: ClienteI | null = await Cliente.findByPk(id);
            if(!clienteExist) return res.status(500).json({msg:"El Cliente No existe"})
            await Cliente.destroy(
                {
                    where: {id,active:true}
                }
            )
            res.status(200).json({msg:"Cliente Eliminado",clienteExist})
        } catch (error) {
            console.error("Error en deleteCliente:", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }

    } 
    
    public async updateCliente(req: Request, res: Response) {
        const { id } = req.params;

        const {
            nombreCliente,
            direccionCliente,
            telefonoCliente,
            correoCliente,
            passwordCliente
        } = req.body;
    
        try {
            const clienteExist: ClienteI | null = await Cliente.findByPk(id);
    
            if (!clienteExist) {
                return res.status(500).json({ msg: "El Cliente No existe" });
            }
    
            let hashedPassword = clienteExist.passwordCliente;
    
            if (passwordCliente) {
                hashedPassword = await bcrypt.hash(passwordCliente, 10);
            }
    
            let body: ClienteI = {
                nombreCliente,
                direccionCliente,
                telefonoCliente,
                correoCliente,
                passwordCliente: hashedPassword,
                active: true
            };
    
            await Cliente.update(body, {
                where: { id }
            });

            const cliente: ClienteI | null = await Cliente.findByPk(id);
            if (cliente) {
                return res.status(200).json({ cliente });
            }
        } catch (error) {
            console.error("Error en updateCliente:", error);
            res.status(500).json({ mensaje: "Ocurrió un error en el servidor" });
        }
    }
    
}
