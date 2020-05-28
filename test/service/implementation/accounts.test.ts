import { assertEquals } from 'https://deno.land/std/testing/asserts.ts'
import { ServerRequest } from 'https://deno.land/x/oak/deps.ts'
import { Request, Response } from 'https://deno.land/x/oak/mod.ts'
import { AccountsService } from '../../../src/service/implementation/accounts.ts'
import { Routes } from '../../../src/models/routes.ts'

const { test } = Deno

test('getName', async () => {

    const serverRequest = new ServerRequest()
    const headers = new Headers()
    const headerRequestedBy = 'X-Requested-By'

    serverRequest.url = '/api/v1/accounts'
    serverRequest.method = Routes.Methods.GET
    headers.set(headerRequestedBy, 'tests')
    serverRequest.headers = headers

    const request = new Request(serverRequest);
    const response = new Response(request);
    await new AccountsService().getName({ request, response})

    assertEquals('accounts', response.body.module)
    assertEquals(headers.get(headerRequestedBy), response.body.requestHeaders.get(headerRequestedBy))
})

test('getAccountById', async () => {

})