import { Args, Context, Describe, Group } from 'command.ts';
import AddonWatcher from '../addon-watcher';
import {
  DISCORD_EMBED_FIELD_LIMIT,
  formatInvalidCommand,
  formatUnexpectedError,
  getEmbed,
  getMsg,
} from '../helpers';
import { ArgsRequired } from '../middleware';
import Addon from '../models/addon';

function listAddons(ctx: Context, addons: Addon[]) {
  let embed = getEmbed();
  for (let i = 0; i < addons.length; i++) {
    const addon = addons[i];
    embed.addField(
      addon.manifest.name,
      `\`${addon.manifest.id}\`\n${addon.manifest.description}`,
    );
    // if we reach the limit or last item in the list, send the embed
    if (
      (i > 0 && i % DISCORD_EMBED_FIELD_LIMIT === 0) ||
      i === addons.length - 1
    ) {
      ctx.send({ embed });
      embed = getEmbed();
    }
  }
}

@Group('Addon')
export default class AddonCommand {
  @Describe({
    description: 'list all available addons',
  })
  async list(ctx: Context) {
    const addons = await new AddonWatcher().getAddonsList();
    listAddons(ctx, addons);
  }

  @Describe({
    description: 'search cataloged addon',
    usage: '<addon name>',
  })
  @ArgsRequired
  async search(ctx: Context) {
    const query = getMsg(ctx);

    try {
      let addons = await new AddonWatcher().getAddonsList();
      addons = addons.filter(
        (addon) => addon.manifest.name.toLowerCase().indexOf(query) > -1,
      );

      if (addons.length === 0)
        return ctx.send(formatInvalidCommand('Addon(s) not found'));

      listAddons(ctx, addons);
    } catch (err) {
      console.error(err);
      ctx.send(formatUnexpectedError('Sorry, something went wrong'));
    }
  }

  @Describe({
    description: 'get complete addon manifest',
    usage: '<addon id>',
  })
  @ArgsRequired
  async manifest(
    ctx: Context,
    @Args.String('unique addon id (use `!search` or `!list` to find this)')
    id?: string,
  ) {
    try {
      const addons = await new AddonWatcher().getAddonsList();
      const addon = addons.find((addon) => addon.manifest.id === id);
      if (!addon)
        return ctx.send(formatInvalidCommand('Addon with given ID not found!'));

      const stringManifest = JSON.stringify(addon.manifest, null, 2);
      const maxLength = 1990;

      for (let i = 0; i < stringManifest.length; i += maxLength) {
        const chunk = stringManifest.slice(i, (i + 1) * maxLength);
        ctx.send({
          code: true,
          content: chunk,
        });
      }
    } catch (err) {
      console.error(err);
      ctx.send(formatUnexpectedError('Sorry, something went wrong'));
    }
  }

  @Describe({
    description: 'get addon info',
    usage: '<addon id>',
  })
  @ArgsRequired
  async info(
    ctx: Context,
    @Args.String('unique addon id (use `!search` or `!list` to find it)')
    id?: string,
  ) {
    try {
      const addons = await new AddonWatcher().getAddonsList();
      const addon = addons.find((addon) => addon.manifest.id === id);
      if (!addon)
        return ctx.send(formatInvalidCommand('Addon with given ID not found!'));
      const { manifest } = addon;
      const embed = getEmbed();

      const {
        name,
        description,
        types,
        catalogs,
        background,
        logo,
        version,
      } = manifest;

      if (name) embed.setTitle(name);
      if (description) embed.addField('Description', description);
      if (types.length) embed.addField('Types', types.join(', '));
      if (catalogs.length)
        embed.addField('Catalogs', catalogs.map((c) => c.name).join(', '));
      if (background) embed.setImage(background);
      if (logo) embed.setThumbnail(logo);
      if (addon.transportUrl) embed.setURL(addon.transportUrl);
      if (version) embed.setFooter('v' + version);
      ctx.send({ embed });
    } catch (err) {
      console.error(err);
      ctx.send(formatUnexpectedError('Sorry, something went wrong'));
    }
  }
}
