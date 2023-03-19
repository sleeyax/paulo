import { config as configEnv } from 'dotenv';
import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';
import commands, { commandMap } from './commands';

configEnv();

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('Started refreshing slash commands.');

    await rest.put(Routes.applicationCommands(process.env.DISCORD_APP_ID), {
      body: commands.map((command) => command.toJSON()),
    });

    console.log('Successfully reloaded slash commands.');

    const client = new Client({ intents: [GatewayIntentBits.Guilds] });

    client.on('interactionCreate', async (interaction) => {
      if (!interaction.isChatInputCommand()) return;

      const handler = commandMap[interaction.commandName];
      await handler?.(interaction);
    });

    await client.login(process.env.DISCORD_TOKEN);
  } catch (error) {
    console.error(error);
  }
})();
