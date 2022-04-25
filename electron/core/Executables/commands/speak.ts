import { api } from '../../../bridge';
import { Executable } from '../ExecutableTypes';

export const speak: Executable = {
  name: 'speak',
  useage: 'speak <text>',
  description: 'Speak the given text',
  onExecute: (args: string[]) => {
    if (args.length === 0) {
      api.sendMessage({
        text: 'Please specify text to speak',
        newLine: true,
        color: 'red',
      });
      return;
    }

    const text = args.join(' ');
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.volume = 1;
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);

    api.sendMessage({
      text: text,
      newLine: true,
    });
  },
};
