import { assertEquals } from 'https://deno.land/std/testing/asserts.ts'
import { ServerRequest } from 'https://deno.land/x/oak/deps.ts'
import { Application, Context, Request, Response } from 'https://deno.land/x/oak/mod.ts'
import { stub, resolves } from 'https://deno.land/x/mock/stub.ts'
import { HealthService } from 'service/implementation/health.ts'
import { Routes } from 'models/routes.ts'
import { soxa } from 'https://deno.land/x/soxa/mod.ts'
import { Constants } from 'constants'

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
    const context: Context = new Context(new Application(), setup())
    await new HealthService().getTime(context)

    // @ts-ignore
    const { response: { body: { serverTime }}} = context
    const currentTime = Math.round(new Date().getTime()/1000)
    const methodTime = Math.round(new Date(serverTime).getTime()/1000)
    assertEquals(currentTime, methodTime)
})

test('health/getInfo', async () => {
  const soxaResponse = {
    data: {
      ip: '172.0.0.1'
    }
  }
  stub(soxa, 'get', resolves(soxaResponse))

  const request: Request = new Request(setup());
  const response: Response = new Response(request);
  await new HealthService().getInfo({ response })

  // @ts-ignore
  const { body: { app, status, ipAddress } } = response
  assertEquals(soxaResponse.data.ip, ipAddress)
  assertEquals(Constants.APP_NAME, app)
  assertEquals('UP', status)
})