import { assertEquals } from 'https://deno.land/std/testing/asserts.ts'
import { ServerRequest } from 'https://deno.land/x/oak/deps.ts'
import { Application, Context, Response } from 'https://deno.land/x/oak/mod.ts'
import { HealthService } from 'service/implementation/health.ts'
import { Routes } from 'models/routes.ts'

const { test } = Deno

function setup (): ServerRequest {
    const serverRequest = new ServerRequest()
    const headers = new Headers()

    serverRequest.url = '/api/v1/accounts'
    serverRequest.method = Routes.Methods.GET
    serverRequest.proto = 'http'
    headers.set('host', 'example.com')
    serverRequest.headers = headers

    return serverRequest
}

test('health/getTime', async () => {
    const serverRequest: ServerRequest = setup()
    const context: Context = new Context(new Application(), serverRequest)
    await new HealthService().getTime(context)

    // @ts-ignore
    const { response: { body: { serverTime }}} = context
    const currentTime = Math.round(new Date().getTime()/1000)
    const methodTime = Math.round(new Date(serverTime).getTime()/1000)
    assertEquals(currentTime, methodTime)
})

test('health/getInfo', () => {

})