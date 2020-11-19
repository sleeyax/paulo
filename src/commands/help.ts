import { Context, Describe, Group } from 'command.ts';

import { Commands } from 'command.ts';
import { MessageEmbed } from 'discord.js';

const { version } = require('../../package.json');

@Group('Help')
export default class HelpCommand {
  @Describe({
    description: 'show a list of available commands',
  })
  help(ctx: Context) {
    const commandGroups = Commands.groups;

    const embed = new MessageEmbed()
      .setColor('#634179;')
      .setTitle('Paulo Bot')
      .setDescription('List of available commands:')
      .setFooter(`v${version}`)
      .setURL('https://github.com/sleeyax/paulo');

    for (const group of commandGroups) {
      const commands = Commands.store.filter((c) => c.group === group);
      const values = commands.map((command) => {
        const loc: string[] = [];

        const aliases = command.defaultName
          ? command.aliases.slice(1)
          : command.aliases;

        if (aliases.length > 0) loc.push(`aliases: ${aliases.join(', ')}`);

        if (command.usage && command.usage.toLowerCase() !== 'no information') {
          let prefix = process.env.DISCORD_PREFIX;

          if (command.prefix === 'notallowed') prefix = '';
          else if (command.prefix === 'optional') prefix = `(${prefix})`;

          loc.push(`usage: ${prefix}${command.name} ${command.usage}`);
        }

        if (command.paramNames.length > 0)
          loc.push(`arguments: ${command.paramNames.join(', ')}`);

        let value = `**${command.name}**
        ${command.description || 'No description'}`;

        if (loc.length > 0) {
          value += `
          \`\`\`${loc.join('\n')}\`\`\``;
        }

        return value;
      });

      embed.addField(group + ' Commands', values.join('\n'));
    }

    ctx.send({ embed });
  }
}
