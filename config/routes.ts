import { Router } from 'https://deno.land/x/oak/mod.ts'
import * as log from 'https://deno.land/std/log/mod.ts'

const { readDirSync } = Deno

export namespace Routes {

    export const router = new Router()

    new class BaseRoute {

        private controllerDirectory = './controllers'
        private basePath = '/api/v1/'

        constructor() {
            this.generateRoute()
        }

        generateRoute = () => {
            for (const entry of readDirSync(this.controllerDirectory)) {
                const entryName = entry.name.split('.').slice(0, -1).join('.');
            
                if (entry.isFile) {
                    const mainRoute = `${this.basePath}${entryName}`
                    const filePath = `.${this.controllerDirectory}/${entry.name}`
            
                    import(filePath).then((module) => {    
                        for (const endpoint of module.default) {
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
        serviceMethod: object;
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