import { ClienteRoutes } from './clientes.router';
import { ProductoVentaRoutes } from './product_ventas.router';
import { ProductoRoutes, TipoProductoRoutes } from './productos.router';
import { VentaRoutes } from './ventas.router';

export class Routes {
    public clienteRoutes: ClienteRoutes = new ClienteRoutes();
    public ventaRoutes:VentaRoutes=new VentaRoutes();
    public productoRoutes:ProductoRoutes=new ProductoRoutes();
    public tipoProducto:TipoProductoRoutes=new TipoProductoRoutes();
    public productoVentaRoutes:ProductoVentaRoutes= new ProductoVentaRoutes()
}
