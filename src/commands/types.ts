import { ChatInputCommandInteraction } from 'discord.js';

export type CommandImpl = (
  interaction: ChatInputCommandInteraction,
) => Promise<void>;
