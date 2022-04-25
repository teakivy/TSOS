import { api } from '../../../bridge';
import { getCurrentDirAsFileSystem } from '../../FileSystem/fileManager';
import { Executable } from '../ExecutableTypes';

export const rmfile: Executable = {
  name: 'rmfile',
  useage: 'rmfile <file>',
  description: 'Remove a file',
  onExecute: (args: string[]) => {
    let currentDir = getCurrentDirAsFileSystem();
    if (currentDir.hasFile(args[0])) {
      currentDir.deleteFile(args[0]);
      api.sendMessage({ text: 'Removed file ' + args[0], newLine: true });
    } else {
      api.sendError('File ' + args[0] + ' does not exist');
    }
  },
};
