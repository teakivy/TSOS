import { api } from '../../../bridge';
import { getCurrentDirectory } from '../../FileSystem/fileManager';
import { Executable } from '../ExecutableTypes';

export const pwd: Executable = {
  name: 'pwd',
  useage: 'pwd',
  description: 'Print the current working directory',
  onExecute: () => {
    api.sendMessage({
      text: 'Current working directory: ' + getCurrentDirectory(),
      newLine: true,
    });
  },
};
