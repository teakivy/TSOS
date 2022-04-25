import { PythonShell } from 'python-shell';
import { api } from '../../../bridge';
import { Executable } from '../ExecutableTypes';

export const py: Executable = {
  name: 'py',
  useage: 'py <code>',
  description: 'Run Python code',
  onExecute: (args: string[]) => {
    let code = args.join(' ');

    api.sendMessage({
      text: 'Running Python code...',
      newLine: true,
      color: 'green',
    });

    let pyShell = PythonShell.runString(
      code,
      undefined,
      function (err: { toString: () => string }) {
        if (err) {
          api.sendError(err.toString());
        }
      }
    );

    pyShell.on('message', function (message: any) {
      // received a message sent from the Python script (a simple "print" statement)
      api.sendMessage({
        text: message,
        newLine: true,
      });
    });
  },
};
