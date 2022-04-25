import { PythonShell } from 'python-shell';
import { api } from '../../../bridge';
import { Executable } from '../ExecutableTypes';

export const js: Executable = {
  name: 'js',
  useage: 'js <code>',
  description: 'Run JavaScript code',
  onExecute: (args: string[]) => {
    let code = args.join(' ');

    api.sendMessage({
      text: 'Running JavaScript code...',
      newLine: true,
      color: 'green',
    });

    code.replace('console.log', 'sendMessage');

    try {
      let cs = console.log;
      console.log = function sendMessage(message: any) {
        api.sendMessage({
          text: message.toString(),
          newLine: true,
        });
      };
      eval(code);

      console.log = cs;
    } catch (e: any) {
      api.sendError(e.toString());
    }
  },
};
