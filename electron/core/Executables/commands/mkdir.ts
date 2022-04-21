import { api } from '../../../bridge';
import {
  getCurrentDirAsFileSystem,
  getCurrentDirectory,
} from '../../FileSystem/fileManager';

export const mkdir = {
  name: 'mkdir',
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
