import { Context } from 'command.ts';
import { MessageEmbed } from 'discord.js';
const { version } = require('../package');

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

export function formatUnexpectedError(msg: string) {
  return `**${msg}**`;
}

export function getEmbed() {
  return new MessageEmbed()
    .setColor('#634179;')
    .setTitle('Paulo Bot')
    .setFooter(`v${version}`)
    .setURL('https://github.com/sleeyax/paulo');
}

export const DISCORD_EMBED_FIELD_LIMIT = 25;
