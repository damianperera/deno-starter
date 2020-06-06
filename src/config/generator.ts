import * as log from 'https://deno.land/std/log/mod.ts'
import Constants from '../constants.ts'
import { Routes } from '../models/routes.ts'

const { readDirSync } = Deno
const entries: Iterable<any> = readDirSync(Constants.CONTROLLER_DIRECTORY)

let routeFile = `import { Router } from 'https://deno.land/x/oak/mod.ts'\nexport const router = new Router()\n`

const INVALID_ENDPOINT_TYPE = 'Ensure endpoints are of type Array<Routes.Endpoints> - invalid endpoint type declaration found in'

for (const entry of entries) {
    const entryName = entry.name.split('.').slice(0, -1).join('.');

    if (entry.isFile) {
        const mainRoute = `${Constants.BASE_PATH}${entryName}`
        const filePath = `../../${Constants.CONTROLLER_DIRECTORY}/${entry.name}`

        routeFile = routeFile + `\nimport ${entryName} from '${filePath}'\n`

        await import(filePath).then((module) => {
            const endpoints: Array<Routes.Endpoints> = module.default

            let endpointArrCount: number = 0
            for (const endpoint of endpoints) {
                if (!Routes.isEndpoint(endpoint)) {
                    log.error(`${INVALID_ENDPOINT_TYPE} ${filePath.substring(3)}`)
                    Deno.exit(1)
                }

                const method: Routes.Methods = endpoint.httpMethod
                const route = `${mainRoute}${endpoint.path}`

                log.info(`Configured - ${method.toUpperCase()} ${route}`)
                routeFile = routeFile + `router['${method}']('${route}', ${entryName}[${endpointArrCount}].serviceMethod)\n`
                endpointArrCount++
            }
        })
    }
}

const encoder = new TextEncoder()
Deno.writeFileSync('src/config/routes.ts', encoder.encode(routeFile))