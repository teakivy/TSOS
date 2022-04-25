import { api } from '../../../bridge';
import {
  getCurrentDirAsFileSystem,
  getCurrentDirectory,
} from '../../FileSystem/fileManager';
import { Executable } from '../ExecutableTypes';

export const mkdir: Executable = {
  name: 'mkdir',
  useage: 'mkdir <directory>',
  description: 'Create a directory',
  onExecute: (args: string[]) => {
    let currentDir = getCurrentDirAsFileSystem();
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
