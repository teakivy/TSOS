import { api } from '../../../bridge';
import { getCurrentDirAsFileSystem } from '../../FileSystem/fileManager';
import { Executable } from '../ExecutableTypes';

/**
 * Remove a directory
 */
export const rmdir: Executable = {
  name: 'rmdir',
  useage: 'rmdir <directory>',
  description: 'Remove a directory',
  onExecute: (args: string[]) => {
    // Get the directory
    let currentDir = getCurrentDirAsFileSystem();
    // If the directory exists, remove it
    if (currentDir.hasDirectory(args[0])) {
      currentDir.deleteDirectory(args[0]);
      api.sendMessage({ text: 'Removed directory ' + args[0], newLine: true });
    } else {
      // Otherwise, return an error
      api.sendError('Directory ' + args[0] + ' does not exist');
    }
  },
};
