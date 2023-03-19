import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import {
  formatInvalidCommand,
  formatUnexpectedError,
  formatEmbedBase,
} from '../utils/formatters';
import { getAddonsList } from '../utils/api';

export const INFO = 'info';

export const infoCommand = new SlashCommandBuilder()
  .setName('info')
  .setDescription('Fetch information about an addon')
  .addStringOption((option) =>
    option.setName('id').setDescription('Id of the addon').setRequired(true),
  );

export async function infoCommandImpl(
  interaction: ChatInputCommandInteraction,
) {
  const id = interaction.options.getString('id');

  try {
    const addons = await getAddonsList();
    const addon = addons.find((addon) => addon.manifest.id === id);
    if (!addon) {
      await interaction.reply(
        formatInvalidCommand('Addon with given ID not found!'),
      );
      return;
    }

    const { manifest } = addon;
    const embed = formatEmbedBase();

    const { name, description, types, catalogs, background, logo, version } =
      manifest;

    if (name) embed.setTitle(name);
    if (description)
      embed.addFields([{ name: 'Description', value: description }]);
    if (types.length)
      embed.addFields([{ name: 'Types', value: types.join(', ') }]);
    if (catalogs.length)
      embed.addFields([
        { name: 'Catalogs', value: catalogs.map((c) => c.name).join(', ') },
      ]);
    if (background) embed.setImage(background);
    if (logo) embed.setThumbnail(logo);
    if (addon.transportUrl) embed.setURL(addon.transportUrl);
    if (version) embed.setFooter({ text: 'v' + version });

    await interaction.reply({ embeds: [embed] });
  } catch (err) {
    console.error(err);
    await interaction.reply(
      formatUnexpectedError('Sorry, something went wrong'),
    );
  }
}
