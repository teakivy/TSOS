import { api } from '../../../bridge';
import { getCurrentDirAsFileSystem } from '../../FileSystem/fileManager';
import { Executable } from '../ExecutableTypes';

/**
 * Read the contents of a file
 */
export const read: Executable = {
  name: 'read',
  useage: 'read <file>',
  description: 'Read the contents of a file',
  onExecute: (args: string[]) => {
    // Get the directory
    let currentDir = getCurrentDirAsFileSystem();
    // If the file exists, read it
    if (currentDir.hasFile(args[0])) {
      // @ts-ignore
      let content = currentDir.getFile(args[0]).getContent();
      // Split on new lines as the renderer cannot handle new lines
      content.split('\\n').forEach((line: string) => {
        api.sendMessage({
          // @ts-ignore
          text: line,
          newLine: true,
        });
      });
    } else {
      // Otherwise, return an error
      api.sendError('File ' + args[0] + ' does not exist');
    }
  },
};
