import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export const ABOUT = 'about';

export const aboutCommand = new SlashCommandBuilder()
  .setName('about')
  .setDescription('About this bot');

export async function aboutCommandImpl(
  interaction: ChatInputCommandInteraction,
) {
  interaction.reply(
    'I am a **Lead Customer Success Engineer** from Vercel (former Zeit.co and Now.sh) who bannned all Stremio addons from the service with no prior notice or given reason. I also did nothing at all to resolve the situation. Now my legacy lives on in this discord server as I will be remembered as a bot to do any kinds of chores r/StremioAddons demands from me!',
  );
}
