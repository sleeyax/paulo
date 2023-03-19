import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import {
  formatInvalidCommand,
  formatUnexpectedError,
  formatEmbedBase,
} from '../utils/formatters';
import { getAddonsList } from '../utils/api';
import { DISCORD_EMBED_FIELD_LIMIT } from '../utils/constants';

export const SEARCH = 'search';

export const searchCommand = new SlashCommandBuilder()
  .setName(SEARCH)
  .setDescription('Search an addon in the catalog')
  .addStringOption((option) =>
    option
      .setName('addon')
      .setDescription('Name of the addon to search')
      .setRequired(true),
  );

export async function searchCommandImpl(
  interaction: ChatInputCommandInteraction,
) {
  const query = interaction.options.getString('addon');

  try {
    let addons = await getAddonsList();

    addons = addons.filter(
      ({ manifest }) =>
        manifest.name.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        (manifest.description &&
          manifest.description.toLowerCase().includes(query.toLowerCase())),
    );

    if (addons.length === 0)
      await interaction.reply(formatInvalidCommand('Addon(s) not found'));

    let embed = formatEmbedBase();
    for (let i = 0; i < addons.length; i++) {
      const addon = addons[i];
      embed.addFields([
        {
          name: addon.manifest.name,
          value: `\`${addon.manifest.id}\`\n${addon.manifest.description}`,
        },
      ]);
      // if we reach the limit or last item in the list, send the embed
      if (
        (i > 0 && (i + 1) % DISCORD_EMBED_FIELD_LIMIT === 0) ||
        i === addons.length - 1
      ) {
        await interaction.reply({ embeds: [embed] });
        return;
      }
    }
  } catch (err) {
    console.error(err);
    interaction.reply(formatUnexpectedError('Sorry, something went wrong'));
  }
}
