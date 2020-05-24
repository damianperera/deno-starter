import { Context } from 'https://deno.land/x/oak/mod.ts'
import * as log from 'https://deno.land/std/log/mod.ts'
import { Error } from '../models/error.ts'

export namespace HTTP {
    export class Exceptions {
        private readonly INTERNAL_SERVER_ERROR = 500

        public catch = async (context : Context, next : Function) => {
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
        public requestTimer = async (context : Context, next : Function) => {
            const start = Date.now();
            await next();
            const ms = Date.now() - start;
            context.response.headers.set('X-Response-Time', `${ms}ms`);
            log.info(`${context.request.method} ${context.request.url} - ${ms} ms`);
        }
    }
    
}

