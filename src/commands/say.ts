import { Context, Describe, Group } from 'command.ts';

@Group('fun')
export default class SayCommand {
  @Describe({
    aliases: ['talk'],
    description: 'Make Paulo say something.',
  })
  say(ctx: Context) {
    ctx.send(ctx.content.replace(`${ctx.usedPrefix}${ctx.usedAlias}`, ''));
  }

  @Describe({
    aliases: ['whisper'],
    description: 'Make Paulo say something, but without tagging anyone',
  })
  sayClean(ctx: Context) {
    ctx.send(ctx.cleanContent.replace(`${ctx.usedPrefix}${ctx.usedAlias}`, ''));
  }
}
