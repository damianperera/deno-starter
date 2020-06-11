import { Application, log } from 'deps'
import Constants from 'constants'
import { router } from 'config/routes.ts'
import { HTTP } from 'config/http.ts'

const app = new Application()

app.use(new HTTP.Exceptions().catch);
app.use(new HTTP.Logger().requestCorrelation)
app.use(new HTTP.Logger().requestTimer);

app.use(router.routes())
app.use(router.allowedMethods())

log.info(`${Constants.APP_NAME} started on port ${Constants.PORT}`)

await app.listen({ port: Constants.PORT })