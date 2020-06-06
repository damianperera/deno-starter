import { Context, Response } from 'https://deno.land/x/oak/mod.ts'
import { soxa as api } from 'https://deno.land/x/soxa/mod.ts'
import Constants from 'constants'
import { Health } from 'service/interface/health.ts'

export class HealthService implements Health {

    public getTime = async ( context: Context ) => {
        context.response.body = {
            serverTime: Date.now()
        }
    }

    public getInfo = async ( { response }: { response: Response } ) => {
        const ipIfyBaseURL = 'http://api.ipify.org'
        const options = {
            params : {
                format: 'json'
            }
        }

        await api.get(ipIfyBaseURL, options)
        .then((res) => {
            response.body = {
                app: Constants.APP_NAME,
                status: 'UP',
                ipAddress: res.data.ip
            }
        })
        .catch((err) => {
            throw new Error(err)
        })
    }

}