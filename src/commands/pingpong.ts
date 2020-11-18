import { Commands, Context, Group } from "command.ts";

@Group("commands for testing")
export default class PingPongCommand {
    ping(ctx: Context) {
        ctx.send("pong!");
    }

    pong(ctx: Context) {
        ctx.send("ping!");
    }
}
