import { api } from '../../../bridge';
import { Executable } from '../ExecutableTypes';

export const exit: Executable = {
  name: 'exit',
  useage: 'exit',
  description: 'Exit the application',
  onExecute: (args: string[]) => {
    api.send('exit');
  },
};
