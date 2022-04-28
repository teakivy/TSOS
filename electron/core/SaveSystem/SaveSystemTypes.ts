import { Executable } from '../Executables/ExecutableTypes';
import { BaseFileSystem } from '../FileSystem/fileSystemTypes';

export interface SaveSystem {
  fileSystem: BaseFileSystem;
  commandHistory: CommandSave[];
  aliases: AliasSave[];
}

export interface CommandSave {
  command: string;
  args: string[];
  text: string;
}

export interface AliasSave {
  name: string;
  command: string;
}
