import { Request, Response } from 'deps'
import { Service } from 'service/interface/service.ts'

export class AccountsService implements Service {

    public getName = async ( { request, response }: { request: Request, response: Response } ) => {
        const headers: Array<object> = []
        request.headers.forEach((value, key) => headers.push({ [key]: value }))
        response.body = {
            module: 'accounts',
            requestHeaders: headers,
        }
    }

    public getAccountById = async ( { params, response }: { params: Record<string, any>, response: Response }) => {
        const accountId = params.accountId
        response.body = {
            account: accountId
        }
    }

}