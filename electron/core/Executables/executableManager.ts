import { api } from '../../bridge';

// Import all commands
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

// Load commands into a list
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
  // Sort by name alphabetically
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
});

// Load aliases into a list, with a default alias of 'list' -> 'ls'
let aliases = [
  {
    name: 'list',
    command: 'ls',
  },
];

// Create a list of previously saved commands
let history: { command: string; args: string[]; text: string }[] = [];

/**
 * Execute a command
 * @param command The command to execute
 * @param args Arguments to pass to the command
 * @param alias If the command is ran by an alias (default: false)
 */
export const execute = (
  command: string,
  args: string[],
  alias: boolean = false
) => {
  // Convert the command to lowercase
  command = command.toLowerCase();

  // If the command is not ran by an alias, add it to the history
  if (!alias) addToHistory(command, args);

  // Catch any errors in command execution
  try {
    // Search for matching aliases
    for (let i = 0; i < aliases.length; i++) {
      if (aliases[i].name === command) {
        // Execite the alias as a command
        execute(aliases[i].command, args, true);
        // Save the command history
        saveAll();
        return;
      }
    }

    // Search for matching commands
    for (let i = 0; i < commands.length; i++) {
      if (commands[i].name === command) {
        // Execute the command
        commands[i].onExecute(args);
        // Save the command history
        saveAll();
        return;
      }
    }

    // If no command is found, throw an error
    api.sendError(`${command} is not a valid command.`);
  } catch (e) {
    // If an error is thrown, send it to the user
    api.sendError('An error occurred while executing this command.');

    // Log the error
    console.log(e);
  }
};

/**
 * Get the list of command history
 * @returns The list of command history
 */
export const getHistory = () => {
  return history;
};

/**
 * Add a command to the command history
 * @param command The command to add to the history
 * @param args Arguments to pass to the command
 */
export const addToHistory = (command: string, args: string[]) => {
  history.push({ command, args, text: command + ' ' + args.join(' ') });
};

/**
 * Set the list of command history
 * @param newHistory The new history to set
 */
export const setHistory = (
  newHistory: { command: string; args: string[]; text: string }[]
) => {
  history = newHistory;
};

/**
 * Get the list of aliases
 * @returns The list of aliases
 */
export const getAliases = () => {
  return aliases;
};

/**
 * Set the list of aliases
 * @param newAliases The new aliases to set
 */
export const setAliases = (newAliases: { name: string; command: string }[]) => {
  aliases = newAliases;
};

/**
 * Remove an alias from the list of aliases
 * @param name Alias name
 */
export const removeAlias = (name: string) => {
  aliases = aliases.filter(a => a.name !== name);
};

/**
 * Add an alias to the list of aliases
 * @param name The name of the alias
 * @param command The command to set the alias to
 */
export const addAlias = (name: string, command: string) => {
  aliases.push({ name, command });
};
