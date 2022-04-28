import { api } from '../../../bridge';
import { saveAll } from '../../SaveSystem/SaveSystemManager';
import { Executable } from '../ExecutableTypes';

/**
 * Save the current state of the system
 */
export const save: Executable = {
  name: 'save',
  useage: 'save',
  description: 'Save the OS file system',
  onExecute: (args: string[]) => {
    // Save the system
    saveAll();
    api.sendMessage({
      text: 'Saved OS file system',
      newLine: true,
      color: 'green',
    });
  },
};
