import { api } from '../../../bridge';
import { Executable } from '../ExecutableTypes';

/**
 * Say something
 */
export const say: Executable = {
  name: 'say',
  useage: 'say <text>',
  description: 'Say the givent text in the console',
  onExecute: (args: string[]) => {
    // If no text is given, return an error
    if (args.length === 0) {
      api.sendMessage({
        text: 'Please specify text to say',
        newLine: true,
        color: 'red',
      });
      return;
    }

    // Send the text to the user
    const text = args.join(' ');
    api.sendMessage({
      text: text,
      newLine: true,
    });
  },
};
