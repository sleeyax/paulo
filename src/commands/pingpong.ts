import { Context, Group } from 'command.ts';

@Group('testing')
export default class PingPongCommand {
  ping(ctx: Context) {
    ctx.send('pong!');
  }

  pong(ctx: Context) {
    ctx.send('ping!');
  }
}
