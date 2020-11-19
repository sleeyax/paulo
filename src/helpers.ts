import { Context } from 'command.ts';
import { split } from 'command.ts/src/Helpers/Split';

/**
 * get message contents without prefix, command & arguments
 * @param ctx
 * @param clean
 */
export function getMsg(
  ctx: Context,
  options?: { clean?: boolean; exclude?: string[] },
) {
  const content = ctx.content;

  // remove prefix and command
  let msg = content.replace(`${ctx.usedPrefix}${ctx.usedAlias}`, '').trim();

  // remove anything else
  const msgSplitted = msg.split(/\s+/);
  console.log(msgSplitted);
  const exclude = options?.exclude || [];
  console.log(exclude);
  for (let i = 0; i < msgSplitted.length; i++) {
    if (exclude.indexOf(msgSplitted[i]) > -1) msgSplitted.splice(i, 1);
  }

  return msgSplitted.join(' ');
}

export function formatInvalidCommand(msg: string) {
  return `*${msg}*`;
}

export function formatApiError(msg: string) {
  return `**DISCORD API ERROR: ${msg}**`;
}
