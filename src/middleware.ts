import { fancify, Context } from 'command.ts';
import { formatInvalidCommand } from './helpers';

// if ctx.channel.type != "text", do not continue the middleware chain
export const NoDm = fancify((ctx: Context) => ctx.channel.type, 'text');

export const ArgsRequired = fancify((ctx: Context) => {
  const next = ctx.args.length > 0;
  if (!next)
    ctx.send(
      formatInvalidCommand('Missing argument. See `!help` for details.'),
    );
  return next;
});
