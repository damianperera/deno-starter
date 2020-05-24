import { Context } from 'remote/x/oak/mod.ts'

export interface Health {
    getInfo(context: Context, next: Function): void;
    getTime(context: Context, next: Function): void;
}