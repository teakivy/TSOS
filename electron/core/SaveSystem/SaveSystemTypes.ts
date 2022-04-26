import { Executable } from '../Executables/ExecutableTypes';
import { BaseFileSystem } from '../FileSystem/fileSystemTypes';

export interface SaveSystem {
  fileSystem: BaseFileSystem;
  commandHistory: CommandSave[];
}

export interface CommandSave {
  command: string;
  args: string[];
  text: string;
}
