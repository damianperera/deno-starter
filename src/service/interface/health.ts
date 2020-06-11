import { Context } from 'deps'

export interface Health {
    getInfo(context: Context, next: Function): void;
    getTime(context: Context, next: Function): void;
}