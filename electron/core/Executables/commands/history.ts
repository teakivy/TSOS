import { api } from '../../../bridge';
import { getHistory } from '../executableManager';
import { Executable } from '../ExecutableTypes';

export const historyCommand: Executable = {
  name: 'history',
  useage: 'history',
  description: 'Show the history of commands',
  onExecute: (args: string[]) => {
    const history = getHistory();
    for (
      let i = history.length > 11 ? history.length - 11 : 0;
      i < history.length - 1;
      i++
    ) {
      api.sendMessage({ text: history[i].text, newLine: true });
    }
  },
};
