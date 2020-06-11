import { Application, Context, Request, Response, api as soxa } from 'deps'
import { ServerRequest, assertEquals, stub, resolves } from 'test-deps'
import { HealthService } from 'service/implementation/health.ts'
import { Routes } from 'models/routes.ts'
import Constants from 'constants'

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

  // Mocking soxa.get()
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