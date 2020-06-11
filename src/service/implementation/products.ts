import { Response } from 'deps'
import { Service } from 'service/interface/service.ts'

export class ProductsService implements Service {

    public getName = async ( { response }: { response: Response } ) => {
        response.body = {
            module: 'products'
        }
    }

    public getProductByRegion = async ( { params, response }: { params: Record<string, any>, response: Response }) => {
        const productId = params.productId
        const regionCode = params.regionCode

        response.body = {
            region: regionCode,
            products: productId
        }
    }
    
}