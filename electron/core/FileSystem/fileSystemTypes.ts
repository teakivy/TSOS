/**
 * Base file system structure, holds pure data with no logic
 */
export interface BaseFileSystem {
  directories: BaseDirectory[];
  files: BaseFile[];
}

/**
 * Base file structure, holds pure data with no logic
 */
export interface BaseFile {
  name: string;
  content: string;
  path: string;
  created: Date;
  lastModified: Date;
  deleted: boolean;
}
/**
 * Base directory structure, holds pure data with no logic
 */
export interface BaseDirectory {
  name: string;
  children: BaseFileSystem;
  path: string;
  created: Date;
  deleted: boolean;
}

/**
 * File system structure, holds data with logic
 */
export interface FileSystem extends BaseFileSystem {
  getFiles(): File[];
  getDirectories(): Directory[];
  addFile(file: BaseFile): File;
  addDirectory(directory: BaseDirectory): Directory;
  deleteFile(name: string): void;
  deleteDirectory(name: string): void;
  hasFile(name: string): boolean;
  hasDirectory(name: string): boolean;
  getFile(name: string): File | FileSystemError;
  getDirectory(name: string): Directory | FileSystemError;
}

/**
 * File structure, holds data with logic
 */
export interface File extends BaseFile {
  exists: () => boolean;
  getExtension: () => string;
  getName: () => string;
  getPath: () => string;
  setContent: (content: string) => void;
  getContent: () => string;
  delete: () => void;
  save: () => void;
}

/**
 * Directory structure, holds data with logic
 */
export interface Directory extends BaseDirectory {
  exists: () => boolean;
  getName: () => string;
  getPath: () => string;
  getChildren: () => FileSystem;
  getFiles: () => File[];
  getSubDirectories: () => Directory[];
  getParent: () => Directory | undefined;
  addFile: (file: BaseFile) => File;
  addSubDirectory: (directory: BaseDirectory) => Directory;
  hasFile: (name: string) => boolean;
  hasSubDirectory: (name: string) => boolean;
  getFile: (name: string) => File | FileSystemError;
  getSubDirectory: (name: string) => Directory | FileSystemError;
  deleteFile(name: string): void;
  deleteSubDirectory(name: string): void;
  delete: () => void;
}

/**
 * File system errors
 */
export interface FileSystemError {
  type: FileSystemErrorType;
  message: string;
}

/**
 * File system error types
 */
export enum FileSystemErrorType {
  FILE_NOT_FOUND,
  FILE_ALREADY_EXISTS,
  DIRECTORY_NOT_FOUND,
  DIRECTORY_ALREADY_EXISTS,
}
