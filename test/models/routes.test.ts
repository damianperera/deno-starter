import { assert } from 'test-deps'
import { Routes } from 'models/routes.ts'

const { test } = Deno

test('routes/isEndpoint', () => {
    let endpointObj: { [key: string]: any } = {
        'httpMethod': Routes.Methods.GET,
        'path': '/test',
        'serviceMethod': () => true
    }

    assert(Routes.isEndpoint(endpointObj))

    delete endpointObj.httpMethod

    assert(!Routes.isEndpoint(endpointObj))

    endpointObj = {
        'invalidKey': 'invalidValue'
    }

    assert(!Routes.isEndpoint(endpointObj))
})