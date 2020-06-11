import { Context } from 'deps'

export interface Service {
    getName(context: Context, next: Function): void;
}