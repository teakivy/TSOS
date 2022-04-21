import { Executable } from '../Executables/ExecutableTypes';
import { BaseFileSystem } from '../FileSystem/fileSystemTypes';

export interface SaveSystem {
  executables: Executable[];
  fileSystem: BaseFileSystem;
}
