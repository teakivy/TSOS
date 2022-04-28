import { Executable } from '../ExecutableTypes';
import { write } from './write';

/**
 * Touch a file
 */
export const touch: Executable = {
  name: 'touch',
  useage: 'touch <file>',
  description: 'Create a blank file',
  onExecute: (args: string[]) => {
    // Run the write command with the file name, and no arguments (empty string)
    write.onExecute([args[0]]);
  },
};
