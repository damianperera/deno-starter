import { Context } from 'https://deno.land/x/oak/mod.ts';

export interface System {
    getInfo(context: Context, next: Function): void;
    getTime(context: Context, next: Function): void;
}