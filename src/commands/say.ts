import { Args, Context, Describe, Group } from 'command.ts';
import { TextChannel } from 'discord.js';
import { formatInvalidCommand, getMsg } from '../helpers';
import { NoDm } from '../middleware';

@Group('fun')
@NoDm
export default class SayCommand {
  @Describe({
    aliases: ['talk'],
    description: 'Make Paulo say something.',
  })
  say(ctx: Context) {
    if (ctx.args.length === 0)
      return ctx.send(formatInvalidCommand('Missing parameters.'));
    ctx.send(getMsg(ctx));
  }

  @Describe({
    aliases: ['whisper'],
    description: 'Make Paulo say something, but without tagging anyone',
  })
  sayClean(ctx: Context) {
    if (ctx.args.length === 0)
      return ctx.send(formatInvalidCommand('Missing parameters.'));
    ctx.send(getMsg(ctx, { clean: true }));
  }

  @Describe({
    aliases: ['sayin'],
    description: 'Make Paulo say something in a specific channel',
    usage: 'say <channel id> <msg>',
  })
  async sayIn(
    ctx: Context,
    @Args.Channel('channel where your message should be sent to')
    channel: TextChannel,
  ) {
    if (ctx.args.length === 0 || !channel)
      return ctx.send(
        formatInvalidCommand('Missing parameters. Required: `channel`, `msg`.'),
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
