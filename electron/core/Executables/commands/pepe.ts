import pepes from 'ascii-pepe';
import { api } from '../../../bridge';
import { Executable } from '../ExecutableTypes';

/**
 * Pepe joke command
 */
export const pepe: Executable = {
  name: 'pepe',
  useage: 'pepe',
  description: ':D',
  onExecute: () => {
    // For each line, send it to the terminal, with black text & white background
    pepes.toArray().forEach(function (line) {
      api.sendMessage({
        text: line + '.\n',
        newLine: true,
        color: 'black',
        backgroundColor: 'white',
      });
    });
  },
};
