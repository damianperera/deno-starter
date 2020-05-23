import { Router, RouterMiddleware } from 'https://deno.land/x/oak/mod.ts'
import * as log from 'https://deno.land/std/log/mod.ts'
import { Constants } from '../constants.ts'

const { readDirSync } = Deno

export namespace Routes {

    export const router = new Router()

    new class BaseRoute {

        constructor() {
            this.generateRoute()
        }

        generateRoute = () => {
            for (const entry of readDirSync(Constants.CONTROLLER_DIRECTORY)) {
                const entryName = entry.name.split('.').slice(0, -1).join('.');
            
                if (entry.isFile) {
                    const mainRoute = `${Constants.BASE_PATH}${entryName}`
                    const filePath = `.${Constants.CONTROLLER_DIRECTORY}/${entry.name}`
            
                    import(filePath).then((module) => {    
                        const endpoints : Array<Endpoints> = module.default

                        for (const endpoint of endpoints) {
                            const method : Methods = endpoint.httpMethod
                            const route = `${mainRoute}${endpoint.path}`
            
                            log.info(`Configured - ${method.toUpperCase()} ${route}`)
                            router[method](route, endpoint.serviceMethod)
                        }
                      });
                }
            }
        }
    }
    
    export interface Endpoints {
        httpMethod: Methods;
        path: string;
        serviceMethod: RouterMiddleware;
    }
    
    export enum Methods {
        DELETE = 'delete',
        GET = 'get',
        HEAD = 'head',
        OPTIONS = 'options',
        PATCH = 'patch',
        POST = 'post',
        PUT = 'put'    
    }
    
}