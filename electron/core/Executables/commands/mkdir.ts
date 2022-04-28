import { api } from '../../../bridge';
import {
  getCurrentDirAsFileSystem,
  getCurrentDirectory,
} from '../../FileSystem/fileManager';
import { Executable } from '../ExecutableTypes';

/**
 * Create a directory
 */
export const mkdir: Executable = {
  name: 'mkdir',
  useage: 'mkdir <directory>',
  description: 'Create a directory',
  onExecute: (args: string[]) => {
    // Get the directory
    let currentDir = getCurrentDirAsFileSystem();
    // Add the directory
    currentDir.addDirectory({
      name: args[0],
      children: {
        directories: [],
        files: [],
      },
      path: getCurrentDirectory() + args[0],
      created: new Date(),
      deleted: false,
    });

    api.sendMessage({ text: 'Created directory ' + args[0], newLine: true });
  },
};
