import { Args, Context, Describe, Group } from 'command.ts';
import { TextChannel } from 'discord.js';
import { formatInvalidCommand, getMsg } from '../helpers';
import { ArgsRequired, NoDm } from '../middleware';

@Group('Funny')
@NoDm
@ArgsRequired
export default class SayCommand {
  @Describe({
    aliases: ['talk'],
    description: 'make the bot say something.',
  })
  say(ctx: Context) {
    ctx.send(getMsg(ctx));
  }

  @Describe({
    aliases: ['whisper'],
    description:
      'make the bot say something, but without tagging people or channels',
  })
  sayClean(ctx: Context) {
    ctx.send(getMsg(ctx, { clean: true }));
  }

  @Describe({
    aliases: ['sayin'],
    description: 'make the bot say something in a specific channel',
    usage: '<channel> your message here',
  })
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
}
