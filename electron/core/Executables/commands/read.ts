import { api } from '../../../bridge';
import { getCurrentDirAsFileSystem } from '../../FileSystem/fileManager';
import { Executable } from '../ExecutableTypes';

export const read: Executable = {
  name: 'read',
  useage: 'read <file>',
  description: 'Read the contents of a file',
  onExecute: (args: string[]) => {
    let currentDir = getCurrentDirAsFileSystem();
    if (currentDir.hasFile(args[0])) {
      // @ts-ignore
      let content = currentDir.getFile(args[0]).getContent();
      content.split('\\n').forEach((line: string) => {
        api.sendMessage({
          // @ts-ignore
          text: line,
          newLine: true,
        });
      });
    } else {
      api.sendError('File ' + args[0] + ' does not exist');
    }
  },
};
