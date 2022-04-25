import { api } from '../../../bridge';
import { Executable } from '../ExecutableTypes';

export const say: Executable = {
  name: 'say',
  useage: 'say <text>',
  description: 'Say the givent text in the console',
  onExecute: (args: string[]) => {
    if (args.length === 0) {
      api.sendMessage({
        text: 'Please specify text to say',
        newLine: true,
        color: 'red',
      });
      return;
    }

    const text = args.join(' ');
    api.sendMessage({
      text: text,
      newLine: true,
    });
  },
};
