import { Context, Describe, Group } from 'command.ts';
import phin from 'phin';
import { Manifest } from 'stremio-addon-sdk';
import {
  DISCORD_EMBED_FIELD_LIMIT,
  formatUnexpectedError,
  getEmbed,
} from '../helpers';

interface Addon {
  transportUrl: string;
  transportName: string;
  manifest: Manifest;
}

async function getAddonsList() {
  const response = await phin('https://api.strem.io/addonscollection.json');
  return JSON.parse(response.body) as Addon[];
}

@Group('Addon')
export default class AddonCommand {
  @Describe({
    description: 'list all available addons',
  })
  async list(ctx: Context) {
    try {
      let embed = getEmbed();
      const addons = await getAddonsList();
      for (let i = 0; i < addons.length; i++) {
        const addon = addons[i];
        embed.addField(addon.manifest.name, `${addon.manifest.description}`);
        // if we reach the limit or last item in the list, send the embed
        if (
          (i > 0 && i % DISCORD_EMBED_FIELD_LIMIT === 0) ||
          i === addons.length - 1
        ) {
          ctx.send({ embed });
          embed = getEmbed();
        }
      }
    } catch (err) {
      console.error(err);
      ctx.send(formatUnexpectedError('Sorry, an unknown error occurred'));
    }
  }

  // TODO: search addon
  // TODO: get addon info/details
}
