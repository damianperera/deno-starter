import { Request, Response } from 'deps'
import { ServerRequest, assertEquals } from 'test-deps'
import { ProductsService } from 'service/implementation/products.ts'
import { Routes } from 'models/routes.ts'

const { test } = Deno
const headerRequestedBy = 'X-Requested-By'

function setup (): ServerRequest {
    const serverRequest = new ServerRequest()
    const headers = new Headers()

    serverRequest.url = '/api/v1/products'
    serverRequest.method = Routes.Methods.GET
    headers.set(headerRequestedBy, 'tests')
    serverRequest.headers = headers

    return serverRequest
}

test('products/getName', async () => {
    const request: Request = new Request(setup());
    const response: Response = new Response(request);
    await new ProductsService().getName({ response })
  
    // @ts-ignore
    const { body: { module } } = response
    assertEquals('products', module)
})

test('products/getProductsByRegion', async () => {
    const request: Request = new Request(setup())
    const response: Response = new Response(request)
    const params = {
        productId: 12345,
        regionCode: 'Tuscanny'
    }
    await new ProductsService().getProductByRegion({ params, response })

    // @ts-ignore
    const { body: { region, products }} = response
    assertEquals(params.regionCode, region)
    assertEquals(params.productId, products)
})