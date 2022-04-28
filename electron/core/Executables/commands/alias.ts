import { api } from '../../../bridge';
import {
  addAlias,
  commands,
  getAliases,
  removeAlias,
} from '../executableManager';
import { Executable } from '../ExecutableTypes';

/**
 * alias helper command
 */
export const alias: Executable = {
  name: 'alias',
  useage: 'alias <set|remove|list> <name> [command]',
  description: 'Create an alias for a command',
  onExecute: (args: string[]) => {
    // If no arguments, return
    if (args.length < 1) {
      api.sendError('Invalid number of arguments.');
      return;
    }

    // If the first argument is set, set an alias
    if (args[0] === 'set') {
      if (args.length < 3) {
        api.sendError('Invalid number of arguments.');
        return;
      }
      if (
        getAliases().some(a => a.name === args[1]) ||
        commands.some(c => c.name === args[1])
      ) {
        api.sendError('Alias already exists.');
        return;
      }
      addAlias(args[1], args[2]);
      api.sendMessage({
        text: `Created alias ${args[1]} for ${args[2]}`,
        newLine: true,
        color: 'green',
      });

      // If the first argument is remove, remove an alias
    } else if (args[0] === 'remove') {
      if (args.length < 2) {
        api.sendError('Invalid number of arguments.');
        return;
      }
      if (!getAliases().some(a => a.name === args[1])) {
        api.sendError('Alias does not exist.');
        return;
      }
      removeAlias(args[1]);
      api.sendMessage({
        text: `Removed alias ${args[1]}`,
        newLine: true,
        color: 'green',
      });

      // If the first argument is list, list all aliases
    } else if (args[0] === 'list') {
      api.sendMessage({
        text: 'Aliases:',
        newLine: true,
        color: 'gold',
      });
      getAliases().forEach(a => {
        api.sendMessage({
          text: `${a.name} -> ${a.command}`,
          newLine: true,
        });
      });

      // Otherwise, show an error
    } else {
      api.sendError('Invalid arguments.');
    }
  },
};
