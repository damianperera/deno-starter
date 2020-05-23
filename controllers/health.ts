import { Routes } from '../config/routes.ts'
import { HealthService } from '../service/implementation/health.ts';

const GET: Routes.Methods = Routes.Methods.GET

const health: Routes.Endpoints[] = [
    {
        'httpMethod': GET,
        'path': '',
        'serviceMethod': new HealthService().getTime
    },
    {
        'httpMethod': GET,
        'path': '/info',
        'serviceMethod': new HealthService().getInfo
    }
]

export default health