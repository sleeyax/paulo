import { fancify, Context } from 'command.ts';

// if ctx.channel.type != "text", do not continue the middleware chain
export const NoDm = fancify((ctx: Context) => ctx.channel.type, 'text');
