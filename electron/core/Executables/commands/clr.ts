import { api } from '../../../bridge';
import { Executable } from '../ExecutableTypes';

export const clr: Executable = {
  name: 'clr',
  useage: 'clr',
  description: 'Clear the screen',
  onExecute: (args: string[]) => {
    api.clearMessages();
  },
};
