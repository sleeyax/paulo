import { EmbedBuilder } from '@discordjs/builders';

const { version } = require('../../package');

export function formatInvalidCommand(msg: string) {
  return `*${msg}*`;
}

export function formatUnexpectedError(msg: string) {
  return `**${msg}**`;
}

export function formatEmbedBase() {
  return new EmbedBuilder()
    .setColor([99, 65, 121])
    .setTitle('Paulo Bot')
    .setFooter({ text: `v${version}` })
    .setURL('https://github.com/sleeyax/paulo');
}
