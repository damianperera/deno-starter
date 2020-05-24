import { Request, Response } from 'https://deno.land/x/oak/mod.ts'
import { Service } from '../interface/service.ts'

export class AccountsService implements Service {

    public getName = async ( { request, response } : { request : Request, response : Response } ) => {
        response.body = {
            "module": "accounts",
            "requestHeaders": request.headers,
        }
    }

    public getAccountById = async ( { params, response } : { params : Record<string, any>, response : Response }) => {
        const accountId = params.accountId
        response.body = {
            "account": accountId
        }
    }

}