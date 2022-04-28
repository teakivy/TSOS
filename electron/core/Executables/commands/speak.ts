import { api } from '../../../bridge';
import { Executable } from '../ExecutableTypes';

/**
 * Soeak aloud
 */
export const speak: Executable = {
  name: 'speak',
  useage: 'speak <text>',
  description: 'Speak the given text',
  onExecute: (args: string[]) => {
    // If no text was given, send a message to the user
    if (args.length === 0) {
      api.sendMessage({
        text: 'Please specify text to speak',
        newLine: true,
        color: 'red',
      });
      return;
    }

    // Create an utterance
    const text = args.join(' ');
    const utterance = new SpeechSynthesisUtterance(text);

    // Set utterance properties
    utterance.volume = 1;
    utterance.rate = 1;
    utterance.pitch = 1;

    // Speak the utterance
    window.speechSynthesis.speak(utterance);

    api.sendMessage({
      text: text,
      newLine: true,
    });
  },
};
