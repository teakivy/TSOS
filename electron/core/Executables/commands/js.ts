import { api } from '../../../bridge';
import { Executable } from '../ExecutableTypes';

/**
 * Execute javascript code
 */
export const js: Executable = {
  name: 'js',
  useage: 'js <code>',
  description: 'Run JavaScript code',
  onExecute: (args: string[]) => {
    // Combine the arguments into a single string
    let code = args.join(' ');

    api.sendMessage({
      text: 'Running JavaScript code...',
      newLine: true,
      color: 'green',
    });

    try {
      // Make a copy of the console.log function
      let cs = console.log;
      // Overwrite the console.log function to send the text to the user
      console.log = function sendMessage(message: any) {
        api.sendMessage({
          text: message.toString(),
          newLine: true,
        });
      };
      // Evaluate the code
      eval(code);

      // Restore the console.log function
      console.log = cs;
    } catch (e: any) {
      // Send the error to the user
      api.sendError(e.toString());
    }
  },
};
