import { api } from '../../../bridge';
import { Executable } from '../ExecutableTypes';

/**
 * Get the date
 */
export const date: Executable = {
  name: 'date',
  useage: 'date',
  description: 'Show the current date and time',
  onExecute: (args: string[]) => {
    // Send the date to the user
    const date = new Date();
    api.sendMessage({
      text: `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
      newLine: true,
      color: 'gold',
    });
  },
};
