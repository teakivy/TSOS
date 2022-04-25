import { api } from '../../../bridge';
import {
  getCurrentDirAsFileSystem,
  getCurrentDirectory,
} from '../../FileSystem/fileManager';
import { Executable } from '../ExecutableTypes';

export const write: Executable = {
  name: 'write',
  useage: 'write <file> <text>',
  description: 'Write text to a file',
  onExecute: (args: string[]) => {
    let currentDir = getCurrentDirAsFileSystem();

    let fileName = args[0];
    let text = args.slice(1).join(' ');

    if (currentDir.hasFile(fileName)) {
      let file = currentDir.getFile(fileName);
      // @ts-ignore
      file.setContent(text);
      api.sendMessage({ text: 'Updated file ' + fileName, newLine: true });
    } else {
      currentDir.addFile({
        name: fileName,
        content: text,
        path: getCurrentDirectory() + '/' + fileName,
        created: new Date(),
        lastModified: new Date(),
        deleted: false,
      });
      api.sendMessage({ text: 'Created file ' + fileName, newLine: true });
    }
  },
};
