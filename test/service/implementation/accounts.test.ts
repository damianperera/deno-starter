import { assertEquals, ServerRequest, Request, Response } from 'deps'
import { AccountsService } from 'service/implementation/accounts.ts'
import { Routes } from 'models/routes.ts'

const { test } = Deno
const headerRequestedBy = 'X-Requested-By'

function setup (): ServerRequest {
    const serverRequest = new ServerRequest()
    const headers = new Headers()

    serverRequest.url = '/api/v1/accounts'
    serverRequest.method = Routes.Methods.GET
    headers.set(headerRequestedBy, 'tests')
    serverRequest.headers = headers

    return serverRequest
}

test('accounts/getName', async () => {
    const serverRequest: ServerRequest = setup()
    const request: Request = new Request(setup());
    const response: Response = new Response(request);
    await new AccountsService().getName({ request, response })

    // @ts-ignore
    const { body: { module, requestHeaders } } = response
    assertEquals('accounts', module)
    assertEquals(serverRequest.headers.get(headerRequestedBy), Object.values(requestHeaders.find(() => headerRequestedBy))[0])
})

test('accounts/getAccountById', async () => {
    const request: Request = new Request(setup())
    const response: Response = new Response(request)
    const params = {
        accountId: 12345
    }
    await new AccountsService().getAccountById({ params, response })

    // @ts-ignore
    const { body: { account }} = response
    assertEquals(params.accountId, account)
})