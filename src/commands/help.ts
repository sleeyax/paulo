import { Context, Describe, Group } from 'command.ts';
import { Commands } from 'command.ts';
import { getEmbed } from '../helpers';

@Group('Help')
export default class HelpCommand {
  @Describe({
    description: 'show a list of available commands',
  })
  help(ctx: Context) {
    const commandGroups = Commands.groups;

    const embed = getEmbed();

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
