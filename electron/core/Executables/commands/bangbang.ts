import { api } from '../../../bridge';
import { execute, getHistory } from '../executableManager';
import { Executable } from '../ExecutableTypes';

/**
 * Execute the last command
 */
export const bangbang: Executable = {
  name: '!!',
  useage: '!!',
  description: 'Execute the last command',
  onExecute: (args: string[]) => {
    // Get the history
    const history = getHistory();
    // If there is no history, return
    if (history.length < 2) {
      api.sendError('No previous commands.');
      return;
    }
    // Otherwise, execute the last command with it's arguments
    const last = history[history.length - 2];
    execute(last.command, last.args);
  },
};
