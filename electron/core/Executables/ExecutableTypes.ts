/**
 * The executable base type
 */
export interface Executable {
  name: string;
  useage: string;
  description: string;
  onExecute: (args: string[]) => void;
}
