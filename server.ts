import { Application } from 'https://deno.land/x/oak/mod.ts'
import * as log from 'https://deno.land/std/log/mod.ts'
import { Routes } from './config/routes.ts'
import { HTTP } from './config/http.ts'
import { Constants } from './constants.ts'

const app = new Application()

app.use(new HTTP.Exceptions().catch);
app.use(new HTTP.Logger().requestTimer);

app.use(Routes.router.routes())
app.use(Routes.router.allowedMethods())

log.info(`${Constants.APP_NAME} started on port ${Constants.PORT}`)

await app.listen({ port: Constants.PORT })
