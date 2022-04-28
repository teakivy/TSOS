import owoify from 'owoifyx';
import { api } from '../../../bridge';
import { Executable } from '../ExecutableTypes';

/**
 * Owoify a string
 */
export const owo: Executable = {
  name: 'owo',
  useage: 'owo <text>',
  description: 'OwOify text',
  onExecute: (args: string[]) => {
    // Send the owoified text
    api.sendMessage({
      text: owoify(args.join(' ')),
      newLine: true,
    });
  },
};
