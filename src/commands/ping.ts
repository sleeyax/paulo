import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export const PING = 'ping';

export const pingCommand = new SlashCommandBuilder()
  .setName(PING)
  .setDescription("Test the bot's responsiveness");

export async function pingCommandImpl(
  interaction: ChatInputCommandInteraction,
) {
  await interaction.reply('pong');
}
