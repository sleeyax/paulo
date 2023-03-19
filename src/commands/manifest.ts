import {
  AttachmentBuilder,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from 'discord.js';
import {
  formatInvalidCommand,
  formatUnexpectedError,
} from '../utils/formatters';
import { getAddonsList } from '../utils/api';

export const MANIFEST = 'manifest';

export const manifestCommand = new SlashCommandBuilder()
  .setName('manifest')
  .setDescription('Download the full manifest of an addon')
  .addStringOption((option) =>
    option.setName('id').setDescription('Id of the addon').setRequired(true),
  );

export async function manifestCommandImpl(
  interaction: ChatInputCommandInteraction,
) {
  const id = interaction.options.getString('id');

  try {
    const addons = await getAddonsList();
    const addon = addons.find((addon) => addon.manifest.id === id);
    if (!addon) {
      await interaction.reply(
        formatInvalidCommand("I can't find any addons with that ID!"),
      );
      return;
    }

    const stringManifest = JSON.stringify(addon.manifest, null, 2);

    await interaction.reply({
      files: [
        new AttachmentBuilder(Buffer.from(stringManifest)).setName(
          'manifest.json',
        ),
      ],
    });
  } catch (err) {
    console.error(err);
    interaction.reply(formatUnexpectedError('Sorry, something went wrong'));
  }
}
