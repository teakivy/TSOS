import { cd } from './commands/cd';
import { mkdir } from './commands/mkdir';
import { ls } from './commands/ls';
import { api } from '../../bridge';

export const execute = (command: string, args: string[]) => {
  switch (command) {
    case 'cd':
      cd.onExecute(args);
      break;
    case 'mkdir':
      mkdir.onExecute(args);
      break;
    case 'ls':
      ls.onExecute(args);
      break;
    default:
      api.sendError(`${command} is not a valid command.`);
      break;
  }
};
