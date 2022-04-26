import { api } from '../../../bridge';
import { Executable } from '../ExecutableTypes';
import { playSong } from './playSong';

export const heyrick: Executable = {
  name: 'heyrick',
  useage: 'heyrick',
  description: ':)',
  onExecute: () => {
    api.sendMessage({
      text: ':)',
      newLine: true,
    });

    playSong.onExecute(['never', 'gonna', 'give', 'you', 'up']);
  },
};
