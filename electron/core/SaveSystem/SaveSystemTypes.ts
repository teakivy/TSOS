import { BaseFileSystem } from '../FileSystem/fileSystemTypes';

/**
 * The saved system
 */
export interface SaveSystem {
  fileSystem: BaseFileSystem;
  commandHistory: CommandSave[];
  aliases: AliasSave[];
}

/**
 * A saved command history
 */
export interface CommandSave {
  command: string;
  args: string[];
  text: string;
}

/**
 * A saved alias
 */
export interface AliasSave {
  name: string;
  command: string;
}
