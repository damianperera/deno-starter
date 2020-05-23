import { Context, Response } from 'https://deno.land/x/oak/mod.ts';
import { Constants } from '../../constants.ts'
import { Health } from '../interface/health.ts'

export class HealthService implements Health {

    public getTime = async ( context: Context, next: Function ) => {
        context.response.body = {
            "serverTime": Date.now()
        }
    }

    public getInfo = async ( { response } : { response : Response } ) => {
        response.body = {
            "app": Constants.APP_NAME,
            "status": "UP"
        }
    }

}