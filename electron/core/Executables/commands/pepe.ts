import pepes from 'ascii-pepe';
import { api } from '../../../bridge';
import { Executable } from '../ExecutableTypes';

export const pepe: Executable = {
  name: 'pepe',
  useage: 'pepe',
  description: ':D',
  onExecute: () => {
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
