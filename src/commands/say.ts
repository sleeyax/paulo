import { Args, Context, Describe, Group } from 'command.ts';
import { TextChannel } from 'discord.js';
import { formatInvalidCommand, getMsg } from '../helpers';
import { ArgsRequired, NoDm } from '../middleware';

@Group('Funny')
@NoDm
export default class SayCommand {
  @Describe({
    aliases: ['talk'],
    description: 'make the bot say something.',
  })
  @ArgsRequired
  say(ctx: Context) {
    ctx.send(getMsg(ctx));
  }

  @Describe({
    aliases: ['whisper'],
    description:
      'make the bot say something, but without tagging people or channels',
  })
  @ArgsRequired
  sayClean(ctx: Context) {
    ctx.send(getMsg(ctx, { clean: true }));
  }

  @Describe({
    aliases: ['sayin'],
    description: 'make the bot say something in a specific channel',
    usage: '<channel> your message here',
  })
  @ArgsRequired
  async sayIn(
    ctx: Context,
    @Args.Channel(
      'name of the text channel where your message should be sent to',
    )
    channel: TextChannel,
  ) {
    if (!channel)
      return ctx.send(
        formatInvalidCommand('Missing arguments. Required: `channel`, `msg`.'),
      );

    const chan = await ctx.client.channels.cache.get(channel.id).fetch();

    if (!chan) return ctx.send(formatInvalidCommand('Channel not found.'));
    if (!chan.isText)
      return ctx.send(
        formatInvalidCommand('Only text channels are supported.'),
      );

    (chan as TextChannel).send(
      getMsg(ctx, { exclude: [channel.name, channel.toString()] }),
    );
  }

  @Describe({
    aliases: ['unaccept'],
    description: 'make the bot deny something',
    usage: '[excuse]',
  })
  unacceptable(
    ctx: Context,
    @Args.String('optional excuse to repeat') excuse?: string,
  ) {
    const msg = getMsg(ctx, { clean: true });
    ctx.send(
      `Sorry, ${
        msg === '' ? 'that' : `'${msg}'`
      } is not an acceptable answer and your ZEIT/Vercel account will remain blocked btw.`,
    );
  }

  @Describe({
    aliases: ['about'],
    description: 'make the bot introduce itself',
  })
  whoru(ctx: Context) {
    ctx.send(
      'I am a **Lead Customer Success Engineer** from Zeit.co (now known as Vercel) who bannned all Stremio addons from the service for no apparant reason. I also did nothing at all to resolve the situation, so now I will be remmebered as a bot here!',
    );
  }
}
