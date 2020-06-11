import { Context, log, v4 } from 'deps'
import Constants from 'constants'
import { Error } from 'models/error.ts'

export namespace HTTP {
    export class Exceptions {
        private readonly INTERNAL_SERVER_ERROR = 500

        public catch = async (context: Context, next: Function) => {
            try {
                await next()
            } catch (e) {
                log.error(e)
                const error: Error = {
                    statusCode: e.statusCode || this.INTERNAL_SERVER_ERROR,
                    message: e.message
                }
                context.response.body = error
            }
        }
    }

    export class Logger {
        public requestCorrelation = async (context: Context, next: Function) => {
            !context.request.headers.get(Constants.CORRELATION_ID_HEADER) && context.request.headers.set(Constants.CORRELATION_ID_HEADER, v4.generate())
            log.info(`[REQ] - ${context.request.headers.get(Constants.CORRELATION_ID_HEADER)} - ${context.request.method} ${context.request.url}`)
            await next()
        }

        public requestTimer = async (context: Context, next: Function) => {
            const start = Date.now()
            await next()
            const ms = Date.now() - start
            context.response.headers.set('X-Response-Time', `${ms}ms`)
            log.info(`[RES] - ${context.request.headers.get(Constants.CORRELATION_ID_HEADER)} - ${ms} ms`)
        }
    }
    
}