import { api } from '../../../bridge';
import { getCurrentDirAsFileSystem } from '../../FileSystem/fileManager';
import { Executable } from '../ExecutableTypes';

export const ls: Executable = {
  name: 'ls',
  useage: 'ls',
  description: 'List the contents of the current directory',
  onExecute: (args: string[]) => {
    let dir = getCurrentDirAsFileSystem();
    let files = dir.getFiles();
    let directories = dir.getDirectories();

    api.sendMessage({ text: 'Directories:', newLine: true, color: 'gold' });
    directories.forEach(direc => {
      api.sendMessage({ text: direc.name, newLine: true });
    });

    api.sendMessage({ text: ' ', newLine: true, color: 'gold' });

    api.sendMessage({ text: 'Files:', newLine: true, color: 'gold' });
    files.forEach(file => {
      api.sendMessage({ text: file.name, newLine: true });
    });
  },
};
