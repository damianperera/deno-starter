import { Context } from 'remote/x/oak/mod.ts'

export interface Service {
    getName(context: Context, next: Function): void;
}