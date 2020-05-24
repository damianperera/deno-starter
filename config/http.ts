import { Context } from 'https://deno.land/x/oak/mod.ts'
import * as log from 'https://deno.land/std/log/mod.ts'

export namespace HTTP {
    export class Exceptions {
        public catch = async (context : Context, next : Function) => {
            try {
                await next()
            } catch (e) {
                log.error(e)
            }
        }
    }

    export class Logger {
        public setTiming = async (context : Context, next : Function) => {
            const start = Date.now();
            await next();
            const ms = Date.now() - start;
            context.response.headers.set("X-Response-Time", `${ms}ms`);
        }
    
        public getTiming = async (context : Context, next : Function) => {
            await next();
            const rt = context.response.headers.get("X-Response-Time");
            log.info(`${context.request.method} ${context.request.url} - ${rt}`);
        }
    }
    
}

