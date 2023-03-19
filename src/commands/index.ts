import { ABOUT, aboutCommand, aboutCommandImpl } from './about';
import { INFO, infoCommand, infoCommandImpl } from './info';
import { MANIFEST, manifestCommand, manifestCommandImpl } from './manifest';
import { PING, pingCommand, pingCommandImpl } from './ping';
import { SEARCH, searchCommand, searchCommandImpl } from './search';
import { CommandImpl } from './types';

const commands = [
  pingCommand,
  searchCommand,
  manifestCommand,
  infoCommand,
  aboutCommand,
];

export const commandMap: { [key: string]: CommandImpl } = {
  [PING]: pingCommandImpl,
  [SEARCH]: searchCommandImpl,
  [MANIFEST]: manifestCommandImpl,
  [INFO]: infoCommandImpl,
  [ABOUT]: aboutCommandImpl,
};

export default commands;
