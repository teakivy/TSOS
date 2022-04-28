import { PythonShell } from 'python-shell';
import { api } from '../../../bridge';
import { Executable } from '../ExecutableTypes';

/**
 * Execute python code
 */
export const py: Executable = {
  name: 'py',
  useage: 'py <code>',
  description: 'Run Python code',
  onExecute: (args: string[]) => {
    // combine arguments into a single string
    let code = args.join(' ');

    api.sendMessage({
      text: 'Running Python code...',
      newLine: true,
      color: 'green',
    });

    // Run the code with PythonShell
    let pyShell = PythonShell.runString(
      code,
      undefined,
      function (err: { toString: () => string }) {
        if (err) {
          api.sendError(err.toString());
        }
      }
    );

    // When print() is called, send the text to the user
    pyShell.on('message', function (message: any) {
      // received a message sent from the Python script (a simple "print" statement)
      api.sendMessage({
        text: message,
        newLine: true,
      });
    });
  },
};
