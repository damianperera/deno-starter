import { Routes } from '../config/routes.ts'
import { AccountsService } from '../service/implementation/accounts.ts';

const GET: Routes.Methods = Routes.Methods.GET

const accounts: Routes.Endpoints[] = [
    {
        'httpMethod': GET,
        'path': '',
        'serviceMethod': new AccountsService().getName
    }
]

export default accounts