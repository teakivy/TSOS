import { api } from '../../../bridge';
import { Executable } from '../ExecutableTypes';

/**
 * Clear the terminal
 */
export const clr: Executable = {
  name: 'clr',
  useage: 'clr',
  description: 'Clear the screen',
  onExecute: (args: string[]) => {
    // Send the clear signal to the main process
    api.clearMessages();
  },
};
