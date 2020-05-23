import * as log from 'https://deno.land/std/log/mod.ts'
import { Context } from 'https://deno.land/x/oak/mod.ts';
import { Constants } from '../../constants.ts'
import { Service } from '../interface/service.ts'

export class AccountsService implements Service {

    public getName = async ( context: Context, next: Function) => {
        context.response.body = {
            "module": "accounts"
        }
    }

}