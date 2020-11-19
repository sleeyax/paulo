import { Context } from 'command.ts';

/**
 * get message contents without prefix, command & arguments
 * @param ctx
 * @param clean
 */
export function getMsg(
  ctx: Context,
  options?: { clean?: boolean; exclude?: string[] },
) {
  const content = options?.clean ? ctx.cleanContent : ctx.content;

  // remove prefix and command
  let msg = content.replace(`${ctx.usedPrefix}${ctx.usedAlias}`, '').trim();

  // remove anything else
  const msgSplitted = msg.split(/\s+/);
  const excluded = options?.exclude || [];
  for (let i = 0; i < msgSplitted.length; i++) {
    if (excluded.indexOf(msgSplitted[i]) > -1) msgSplitted.splice(i, 1);
  }

  return msgSplitted.join(' ');
}

export function formatInvalidCommand(msg: string) {
  return `*${msg}*`;
}

export function formatApiError(msg: string) {
  return `**DISCORD API ERROR: ${msg}**`;
}
