import { Executable } from '../ExecutableTypes';

export const comment: Executable = {
  name: '#',
  useage: '# <comment>',
  description: 'Make a terminal comment',
  onExecute: (args: string[]) => {},
};
