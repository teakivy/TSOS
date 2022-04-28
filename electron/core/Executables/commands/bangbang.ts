import { api } from '../../../bridge';
import { execute, getHistory } from '../executableManager';
import { Executable } from '../ExecutableTypes';

export const bangbang: Executable = {
  name: '!!',
  useage: '!!',
  description: 'Execute the last command',
  onExecute: (args: string[]) => {
    const history = getHistory();
    if (history.length < 2) {
      api.sendError('No previous commands.');
      return;
    }
    const last = history[history.length - 2];
    execute(last.command, last.args);
  },
};
