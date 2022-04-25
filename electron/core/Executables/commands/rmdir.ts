import { api } from '../../../bridge';
import { getCurrentDirAsFileSystem } from '../../FileSystem/fileManager';
import { Executable } from '../ExecutableTypes';

export const rmdir: Executable = {
  name: 'rmdir',
  useage: 'rmdir <directory>',
  description: 'Remove a directory',
  onExecute: (args: string[]) => {
    let currentDir = getCurrentDirAsFileSystem();
    if (currentDir.hasDirectory(args[0])) {
      currentDir.deleteDirectory(args[0]);
      api.sendMessage({ text: 'Removed directory ' + args[0], newLine: true });
    } else {
      api.sendError('Directory ' + args[0] + ' does not exist');
    }
  },
};
