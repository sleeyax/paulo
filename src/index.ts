import { Client } from 'command.ts';
import { join } from 'path';

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const client = new Client({
  prefixes: [process.env.DISCORD_PREFIX || '!'],
  loadDirs: [join(__dirname, '/commands'), join(__dirname, '/events')],
});

async function bootstrap() {
  try {
    await client.login(process.env.DISCORD_TOKEN);
    console.log(`Bot started successfully on ${new Date()}`);
  } catch (err) {
    console.error(err);
  }
}

bootstrap();
