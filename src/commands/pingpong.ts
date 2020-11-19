import { Context, Describe, Group } from 'command.ts';

@Group('Test')
export default class PingPongCommand {
  @Describe({
    description: "replies with 'pong'",
  })
  ping(ctx: Context) {
    ctx.send('pong!');
  }

  @Describe({
    description: "replies with 'ping'",
  })
  pong(ctx: Context) {
    ctx.send('ping!');
  }
}
