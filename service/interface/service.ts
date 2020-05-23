import { Context } from 'https://deno.land/x/oak/mod.ts';

export interface Service {
    getName(context: Context, next: Function): void;
}