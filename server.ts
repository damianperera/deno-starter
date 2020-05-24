import { Application } from 'remote/x/oak/mod.ts'
import * as log from 'remote/std/log/mod.ts'
import { router } from 'framework/routes.ts'
import { HTTP } from 'framework/http.ts'
import { Constants } from 'app/constants'

const app = new Application()

app.use(new HTTP.Exceptions().catch);
app.use(new HTTP.Logger().requestTimer);

app.use(router.routes())
app.use(router.allowedMethods())

log.info(`${Constants.APP_NAME} started on port ${Constants.PORT}`)

await app.listen({ port: Constants.PORT })
