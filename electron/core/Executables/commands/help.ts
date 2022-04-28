import { api } from '../../../bridge';
import { commands } from '../executableManager';
import { Executable } from '../ExecutableTypes';

/**
 * Get help with commands
 */
export const help: Executable = {
  name: 'help',
  useage: 'help',
  description: 'Show help for all commands',
  onExecute: (args: string[]) => {
    api.sendMessage({
      text: 'Available commands:',
      newLine: true,
      color: 'gold',
    });
    api.sendMessage({ text: ' ', newLine: true });

    // Send all commands with their useage, & description
    commands.forEach(command => {
      api.sendMessage([
        {
          text: command.name + ': ',
          color: 'yellow',
          newLine: true,
        },
        {
          text: command.useage,
        },
        { text: command.description, newLine: true },
        { text: ' ', newLine: true },
      ]);
    });
  },
};
