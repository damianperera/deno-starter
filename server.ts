import { Application } from 'https://deno.land/x/oak/mod.ts'
import * as log from 'https://deno.land/std/log/mod.ts'
import { Routes } from './config/routes.ts'
import { Logger } from './config/http.ts'
import { Constants } from './constants.ts'

const app = new Application()
const logger = new Logger()
const port = 8000

app.use(logger.getTiming);
app.use(logger.setTiming)

app.use(Routes.router.routes())
app.use(Routes.router.allowedMethods())

log.info(`${Constants.APP_NAME} started on port ${port}`)

await app.listen({ port })
