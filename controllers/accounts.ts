import { Routes } from '../models/routes.ts'
import { AccountsService } from '../service/implementation/accounts.ts'

const GET: Routes.Methods = Routes.Methods.GET

const accounts: Routes.Endpoints[] = [
    {
        httpMethod: GET,
        path: '',
        serviceMethod: new AccountsService().getName
    },
    {
        httpMethod: GET,
        path: '/:accountId',
        serviceMethod: new AccountsService().getAccountById
    }
]

export default accounts