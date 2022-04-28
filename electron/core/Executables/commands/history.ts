import { api } from '../../../bridge';
import { getHistory, setHistory } from '../executableManager';
import { Executable } from '../ExecutableTypes';

export const historyCommand: Executable = {
  name: 'history',
  useage: 'history [clear]',
  description: 'Show the history of commands',
  onExecute: (args: string[]) => {
    if (args.length === 0) {
      const history = getHistory();
      for (
        let i = history.length > 11 ? history.length - 11 : 0;
        i < history.length - 1;
        i++
      ) {
        api.sendMessage({ text: history[i].text, newLine: true });
      }
    } else if (args[0] === 'clear') {
      setHistory([]);
      api.sendMessage({
        text: 'Cleared history',
        newLine: true,
        color: 'green',
      });
    } else {
      api.sendError('Invalid arguments.');
    }
  },
};
