import { api } from '../../../bridge';
import { Executable } from '../ExecutableTypes';

/**
 * Exit the application
 */
export const exit: Executable = {
  name: 'exit',
  useage: 'exit',
  description: 'Exit the application',
  onExecute: (args: string[]) => {
    // Send exit signal to the main process
    api.send('exit');
  },
};
