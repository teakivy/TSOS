import { saveAll } from '../../SaveSystem/SaveSystemManager';
import { Executable } from '../ExecutableTypes';

export const save: Executable = {
  name: 'save',
  useage: 'save',
  description: 'Save the OS file system',
  onExecute: (args: string[]) => {
    saveAll();
  },
};
