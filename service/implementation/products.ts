import { Response } from 'https://deno.land/x/oak/mod.ts';
import { Service } from '../interface/service.ts'

export class ProductsService implements Service {

    public getName = async ( { response } : { response : Response } ) => {
        response.body = {
            "module": "products"
        }
    }

}