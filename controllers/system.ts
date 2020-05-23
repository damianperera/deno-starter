import { Routes } from '../config/routes.ts'
import { SystemService } from '../service/implementation/system.ts';

const GET: Routes.Methods = Routes.Methods.GET

const system: Routes.Endpoints[] = [
    {
        'httpMethod': GET,
        'path': '/',
        'serviceMethod': new SystemService().getTime
    },
    {
        'httpMethod': GET,
        'path': '/info',
        'serviceMethod': new SystemService().getInfo
    }
]

export default system