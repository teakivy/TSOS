import { Executable } from '../ExecutableTypes';
import { write } from './write';

export const touch: Executable = {
  name: 'touch',
  useage: 'touch <file>',
  description: 'Create a blank file',
  onExecute: (args: string[]) => {
    write.onExecute([args[0]]);
  },
};
