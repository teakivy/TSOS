export interface BaseFileSystem {
  directories: BaseDirectory[];
  files: BaseFile[];
}

export interface BaseFile {
  name: string;
  content: string;
  path: string;
  created: Date;
  lastModified: Date;
  deleted: boolean;
}

export interface BaseDirectory {
  name: string;
  children: BaseFileSystem;
  path: string;
  created: Date;
  deleted: boolean;
}

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

export interface FileSystemError {
  type: FileSystemErrorType;
  message: string;
}

export enum FileSystemErrorType {
  FILE_NOT_FOUND,
  FILE_ALREADY_EXISTS,
  DIRECTORY_NOT_FOUND,
  DIRECTORY_ALREADY_EXISTS,
}
