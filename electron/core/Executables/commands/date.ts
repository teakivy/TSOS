import { api } from '../../../bridge';
import { Executable } from '../ExecutableTypes';

export const date: Executable = {
  name: 'date',
  useage: 'date',
  description: 'Show the current date and time',
  onExecute: (args: string[]) => {
    const date = new Date();
    api.sendMessage({
      text: `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
      newLine: true,
      color: 'gold',
    });
  },
};
