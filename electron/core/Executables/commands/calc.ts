import { evaluate, simplify } from 'mathjs';
import { api } from '../../../bridge';
import { Executable } from '../ExecutableTypes';

// Create variable definitions
let definitions = {};

/**
 * Calculate the result of an expression using mathjs
 */
export const calc: Executable = {
  name: 'calc',
  useage:
    'calc <expression> | calc define <var> <expression> | calc undefine <var> | calc simplify <expression>',
  description: 'Calculate an expression',
  onExecute: (args: string[]) => {
    // Check if the user is defining a variable
    if (args[0] === 'def' || args[0] === 'define') {
      if (args.length < 3) {
        api.sendError('Invalid number of arguments');
        return;
      }
      // @ts-ignore
      definitions[args[1]] = args[2];
      api.sendMessage({
        text: 'Defined ' + args[1] + ' as ' + args[2],
        newLine: true,
      });
      return;
    }

    // Check if the user is undefining a variable
    if (args[0] === 'und' || args[0] === 'undefine') {
      if (args.length < 2) {
        api.sendError('Invalid number of arguments');
        return;
      }
      // @ts-ignore
      delete definitions[args[1]];
      api.sendMessage({ text: 'Undefined ' + args[1], newLine: true });
      return;
    }

    // Check if the user is simplifying an expression
    if (args[0] === 'simp' || args[0] === 'simplify') {
      if (args.length < 2) {
        api.sendError('Invalid number of arguments');
        return;
      }
      args.shift();
      let arg = args.join(' ');
      let result = simplify(arg);
      // @ts-ignore
      api.sendMessage({
        text: result.toString(),
        newLine: true,
        color: 'green',
      });

      return;
    }

    // Evaluate the expression
    let arg = args.join(' ');
    let result = evaluate(arg, definitions);
    api.sendMessage({ text: result.toString(), newLine: true, color: 'green' });
  },
};
