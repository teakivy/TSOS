export interface Executable {
  name: string;
  onExecute: (args: string[]) => void;
}
