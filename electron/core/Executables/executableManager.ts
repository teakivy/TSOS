import { api } from '../../bridge';

import { cd } from './commands/cd';
import { ls } from './commands/ls';
import { mkdir } from './commands/mkdir';
import { read } from './commands/read';
import { rmfile } from './commands/rmfile';
import { rmdir } from './commands/rmdir';
import { write } from './commands/write';
import { calc } from './commands/calc';
import { clr } from './commands/clr';
import { help } from './commands/help';
import { py } from './commands/py';
import { js } from './commands/js';
import { exit } from './commands/exit';
import { date } from './commands/date';
import { speak } from './commands/speak';
import { say } from './commands/say';
import { pauseSong, playSong, stopSong } from './commands/playSong';

export let commands = [
  help,
  cd,
  ls,
  write,
  read,
  mkdir,
  rmfile,
  rmdir,
  calc,
  clr,
  py,
  js,
  exit,
  date,
  speak,
  say,
  playSong,
  pauseSong,
  stopSong,
];

export const execute = (command: string, args: string[]) => {
  try {
    for (let i = 0; i < commands.length; i++) {
      if (commands[i].name === command) {
        commands[i].onExecute(args);
        return;
      }
    }

    api.sendError(`${command} is not a valid command.`);
  } catch (e) {
    api.sendError('An error occurred while executing this command.');
    console.log(e);
  }
};
