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
import { pauseSong, playSong, stop } from './commands/playSong';
import { network } from './commands/network';
import { heyrick } from './commands/heyrick';
import { pepe } from './commands/pepe';
import { owo } from './commands/owo';
import { pwd } from './commands/pwd';
import { touch } from './commands/touch';
import { historyCommand } from './commands/history';
import { save } from './commands/save';
import { saveAll } from '../SaveSystem/SaveSystemManager';
import { alias } from './commands/alias';
import { bangbang } from './commands/bangbang';
import { comment } from './commands/comment';

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
  stop,
  network,
  heyrick,
  pepe,
  owo,
  pwd,
  touch,
  historyCommand,
  save,
  alias,
  bangbang,
  comment,
].sort((a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
});

let aliases = [
  {
    name: 'list',
    command: 'ls',
  },
];

let history: { command: string; args: string[]; text: string }[] = [];

export const execute = (
  command: string,
  args: string[],
  alias: boolean = false
) => {
  command = command.toLowerCase();

  if (!alias) addToHistory(command, args);
  try {
    for (let i = 0; i < aliases.length; i++) {
      if (aliases[i].name === command) {
        execute(aliases[i].command, args, true);
        saveAll();
        return;
      }
    }

    for (let i = 0; i < commands.length; i++) {
      if (commands[i].name === command) {
        commands[i].onExecute(args);
        saveAll();
        return;
      }
    }

    api.sendError(`${command} is not a valid command.`);
  } catch (e) {
    api.sendError('An error occurred while executing this command.');
    addToHistory(command, args);

    console.log(e);
  }
};

export const getHistory = () => {
  return history;
};

export const addToHistory = (command: string, args: string[]) => {
  history.push({ command, args, text: command + ' ' + args.join(' ') });
};

export const setHistory = (
  newHistory: { command: string; args: string[]; text: string }[]
) => {
  history = newHistory;
};

export const getAliases = () => {
  return aliases;
};

export const setAliases = (newAliases: { name: string; command: string }[]) => {
  aliases = newAliases;
};

export const removeAlias = (name: string) => {
  aliases = aliases.filter(a => a.name !== name);
};

export const addAlias = (name: string, command: string) => {
  aliases.push({ name, command });
};
