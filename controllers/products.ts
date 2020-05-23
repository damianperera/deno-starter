import { Routes } from '../config/routes.ts'
import { ProductsService } from '../service/implementation/products.ts';

const GET: Routes.Methods = Routes.Methods.GET

const products: Routes.Endpoints[] = [
    {
        'httpMethod': GET,
        'path': '',
        'serviceMethod': new ProductsService().getName
    }
]

export default products