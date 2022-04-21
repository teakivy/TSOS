import { api } from '../../../bridge';
import { changeCurrentDirectory } from '../../FileSystem/fileManager';
import { Executable } from '../ExecutableTypes';

export const cd: Executable = {
  name: 'cd',
  onExecute: (args: string[]) => {
    changeCurrentDirectory(args[0]);
    api.send('changeDir');
  },
};
