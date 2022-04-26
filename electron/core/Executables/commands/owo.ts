import owoify from 'owoifyx';
import { api } from '../../../bridge';
import { Executable } from '../ExecutableTypes';

export const owo: Executable = {
  name: 'owo',
  useage: 'owo <text>',
  description: 'OwOify text',
  onExecute: (args: string[]) => {
    api.sendMessage({
      text: owoify(args.join(' ')),
      newLine: true,
    });
  },
};
