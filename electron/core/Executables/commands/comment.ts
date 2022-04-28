import { Executable } from '../ExecutableTypes';

/**
 * Blank executable for a comment
 */
export const comment: Executable = {
  name: '#',
  useage: '# <comment>',
  description: 'Make a terminal comment',
  onExecute: (args: string[]) => {},
};
