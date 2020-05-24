import { RouterMiddleware } from 'https://deno.land/x/oak/mod.ts'

export namespace Routes {
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
