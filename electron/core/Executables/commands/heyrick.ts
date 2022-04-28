import { api } from '../../../bridge';
import { Executable } from '../ExecutableTypes';
import { playSong } from './playSong';

/**
 * Play never gonna give you up
 */
export const heyrick: Executable = {
  name: 'heyrick',
  useage: 'heyrick',
  description: ':)',
  onExecute: () => {
    api.sendMessage({
      text: ':)',
      newLine: true,
    });

    // Execute the play song command with "never gonna give you up" as the argument
    playSong.onExecute(['never', 'gonna', 'give', 'you', 'up']);
  },
};
