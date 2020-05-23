import * as log from 'https://deno.land/std/log/mod.ts'
import { Context } from 'https://deno.land/x/oak/mod.ts';
import { Constants } from '../../constants.ts'
import { Health } from '../interface/health.ts'

export class HealthService implements Health {

    public getTime = async ( context: Context, next: Function) => {
        context.response.body = {
            "serverTime": Date.now()
        }
    }

    public getInfo = async ( { response } : { response : any }) => {
        response.body = {
            "app": Constants.APP_NAME
        }
    }

}