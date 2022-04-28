import { api } from '../../../bridge';
import { changeCurrentDirectory } from '../../FileSystem/fileManager';
import { Executable } from '../ExecutableTypes';

/**
 * Change the working directory
 */
export const cd: Executable = {
  name: 'cd',
  useage: 'cd <directory>',
  description: 'Change the current directory',
  onExecute: (args: string[]) => {
    // Change the current directory
    changeCurrentDirectory(args[0]);
    api.send('changeDir');
  },
};
