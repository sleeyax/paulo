import { Context, Group } from 'command.ts';

import { Commands } from 'command.ts';

@Group('help')
export default class HelpCommand {
  help(ctx: Context) {
    const commnadGroups = Commands.groups;
    const commands = Commands.store;
  }
}
