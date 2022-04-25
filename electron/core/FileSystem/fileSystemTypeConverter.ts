import { getFileSystem, saveFileSystem } from './fileManager';
import {
  BaseFileSystem,
  FileSystem,
  File,
  Directory,
  BaseFile,
  BaseDirectory,
  FileSystemError,
  FileSystemErrorType,
} from './fileSystemTypes';
import { removeDeletedFiles } from './fileSystemUtils';

export const convertFileSystem = (
  baseFileSystem: BaseFileSystem
): FileSystem => {
  let fileSystem: FileSystem = {
    directories: baseFileSystem.directories,
    files: baseFileSystem.files,
    getFiles: function (): File[] {
      throw new Error('Function not implemented.');
    },
    getDirectories: function (): Directory[] {
      throw new Error('Function not implemented.');
    },
    addFile: function (file: BaseFile): File {
      throw new Error('Function not implemented.');
    },
    addDirectory: function (directory: BaseDirectory): Directory {
      throw new Error('Function not implemented.');
    },
    deleteFile: function (name: string): void {
      throw new Error('Function not implemented.');
    },
    deleteDirectory: function (name: string): void {
      throw new Error('Function not implemented.');
    },
    hasFile: function (name: string): boolean {
      throw new Error('Function not implemented.');
    },
    hasDirectory: function (name: string): boolean {
      throw new Error('Function not implemented.');
    },
    getFile: function (name: string): File {
      throw new Error('Function not implemented.');
    },
    getDirectory: function (name: string): Directory {
      throw new Error('Function not implemented.');
    },
  };

  fileSystem.getFiles = (): File[] => {
    return fileSystem.files.map((file: BaseFile) => convertFile(file));
  };

  fileSystem.getDirectories = (): Directory[] => {
    return fileSystem.directories.map((directory: BaseDirectory) =>
      convertDirectory(directory)
    );
  };

  fileSystem.addFile = (baseFile: BaseFile): File => {
    fileSystem.files.push(baseFile);

    return convertFile(baseFile);
  };

  fileSystem.addDirectory = (baseDirectory: BaseDirectory): Directory => {
    fileSystem.directories.push(baseDirectory);

    return convertDirectory(baseDirectory);
  };

  fileSystem.deleteFile = (name: string): void => {
    const fileIndex = fileSystem.files.findIndex(
      (file: BaseFile) => file.name === name
    );

    if (fileIndex !== -1) {
      fileSystem.files[fileIndex].deleted = true;
    }

    saveFileSystem(removeDeletedFiles(getFileSystem()));
  };

  fileSystem.deleteDirectory = (name: string): void => {
    const dirIndex = fileSystem.directories.findIndex(
      (directory: BaseDirectory) => directory.name === name
    );

    if (dirIndex !== -1) {
      fileSystem.directories[dirIndex].deleted = true;
    }

    saveFileSystem(removeDeletedFiles(getFileSystem()));
  };

  fileSystem.hasFile = (name: string): boolean => {
    return fileSystem.files.some((file: BaseFile) => file.name === name);
  };

  fileSystem.hasDirectory = (name: string): boolean => {
    return fileSystem.directories.some(
      (directory: BaseDirectory) => directory.name === name
    );
  };

  fileSystem.getFile = (name: string): File | FileSystemError => {
    let file: BaseFile | undefined = fileSystem.files.find(
      (file: BaseFile) => file.name === name
    );
    if (file) {
      return convertFile(file);
    }
    return {
      type: FileSystemErrorType.FILE_NOT_FOUND,
      message: `File ${name} not found.`,
    };
  };

  fileSystem.getDirectory = (name: string): Directory | FileSystemError => {
    let directory: BaseDirectory | undefined = fileSystem.directories.find(
      (directory: BaseDirectory) => directory.name === name
    );
    if (directory) {
      return convertDirectory(directory);
    }
    return {
      type: FileSystemErrorType.DIRECTORY_NOT_FOUND,
      message: `Directory ${name} not found.`,
    };
  };

  return fileSystem;
};

export const convertFile = (baseFile: BaseFile): File => {
  let file = {
    name: baseFile.name,
    content: baseFile.content,
    path: baseFile.path,
    created: baseFile.created,
    lastModified: baseFile.lastModified,
    deleted: baseFile.deleted || false,
    exists: (): boolean => {
      throw new Error('Function not implemented.');
    },
    getExtension: (): string => {
      throw new Error('Function not implemented.');
    },
    getName: (): string => {
      throw new Error('Function not implemented.');
    },
    getPath: (): string => {
      throw new Error('Function not implemented.');
    },
    setContent: (content: string): void => {
      throw new Error('Function not implemented.');
    },
    getContent: (): string => {
      throw new Error('Function not implemented.');
    },
    delete: (): void => {
      throw new Error('Function not implemented.');
    },
    save: (): void => {
      throw new Error('Function not implemented.');
    },
  };

  file.exists = (): boolean => {
    if (file.deleted) {
      return false;
    }
    let links: string[] = file.path.split('/');
    links.shift();

    let fileSystem = getFileSystem();
    for (let i = 0; i < links.length - 1; i++) {
      let directory = fileSystem.getDirectory(links[i]);
      if (
        (directory as FileSystemError).type ===
        FileSystemErrorType.DIRECTORY_NOT_FOUND
      ) {
        return false;
      }
      fileSystem = convertFileSystem((directory as Directory).children);
    }

    return fileSystem.hasFile(links[links.length - 1]);
  };

  file.getExtension = (): string => {
    return file.name.split('.').pop() || '';
  };

  file.getName = (): string => {
    return file.name;
  };

  file.getPath = (): string => {
    return file.path;
  };

  file.setContent = (content: string): void => {
    file.content = content;

    file.lastModified = new Date();

    file.save();
  };

  file.getContent = (): string => {
    return file.content;
  };

  file.delete = (): void => {
    file.deleted = true;
  };

  let totalFS = getFileSystem();
  file.save = (): void => {
    let fs = totalFS;
    let links = file.path.split('/');
    links.shift();
    console.log(links);

    for (let i = 0; i < links.length - 1; i++) {
      let directory = fs.getDirectory(links[i]);
      if (
        (directory as FileSystemError).type ===
        FileSystemErrorType.DIRECTORY_NOT_FOUND
      ) {
        return;
      }
      fs = convertFileSystem((directory as Directory).children);
    }
    fs.deleteFile(file.name);
    fs.addFile(file);

    saveFileSystem(removeDeletedFiles(fs));
  };

  return file;
};

export const convertDirectory = (baseDirectory: BaseDirectory): Directory => {
  let directory = {
    name: baseDirectory.name,
    children: baseDirectory.children,
    path: baseDirectory.path,
    created: baseDirectory.created,
    deleted: baseDirectory.deleted,
    exists: (): boolean => {
      throw new Error('Function not implemented.');
    },
    getName: (): string => {
      throw new Error('Function not implemented.');
    },
    getPath: (): string => {
      throw new Error('Function not implemented.');
    },
    getChildren: (): FileSystem => {
      throw new Error('Function not implemented.');
    },
    getFiles: (): File[] => {
      throw new Error('Function not implemented.');
    },
    getSubDirectories: (): Directory[] => {
      throw new Error('Function not implemented.');
    },
    getParent: (): Directory | undefined => {
      throw new Error('Function not implemented.');
    },
    addFile: (file: BaseFile): File => {
      throw new Error('Function not implemented.');
    },
    addSubDirectory: (directory: BaseDirectory): Directory => {
      throw new Error('Function not implemented.');
    },
    hasFile: (name: string): boolean => {
      throw new Error('Function not implemented.');
    },
    hasSubDirectory: (name: string): boolean => {
      throw new Error('Function not implemented.');
    },
    getFile: (name: string): File | FileSystemError => {
      throw new Error('Function not implemented.');
    },
    getSubDirectory: (name: string): Directory | FileSystemError => {
      throw new Error('Function not implemented.');
    },
    deleteFile: (name: string): void => {
      throw new Error('Function not implemented.');
    },
    deleteSubDirectory: (name: string): void => {
      throw new Error('Function not implemented.');
    },
    delete: (): void => {
      throw new Error('Function not implemented.');
    },
  };

  directory.exists = (): boolean => {
    if (directory.deleted) {
      return false;
    }
    let links: string[] = directory.path.split('/');
    links.shift();

    let fileSystem = getFileSystem();
    for (let i = 0; i < links.length - 1; i++) {
      let directory = fileSystem.getDirectory(links[i]);
      if (
        (directory as FileSystemError).type ===
        FileSystemErrorType.DIRECTORY_NOT_FOUND
      ) {
        return false;
      }
      fileSystem = convertFileSystem((directory as Directory).children);
    }

    return fileSystem.hasDirectory(links[links.length - 1]);
  };

  directory.getName = (): string => {
    return directory.name;
  };

  directory.getPath = (): string => {
    return directory.path;
  };

  directory.getChildren = (): FileSystem => {
    return convertFileSystem(directory.children);
  };

  directory.getFiles = (): File[] => {
    return convertFileSystem(directory.children).getFiles();
  };

  directory.getSubDirectories = (): Directory[] => {
    return convertFileSystem(directory.children).getDirectories();
  };

  directory.getParent = (): Directory | undefined => {
    let links: string[] = directory.path.split('/');
    links.shift();

    let fileSystem = getFileSystem();
    for (let i = 0; i < links.length - 1; i++) {
      let directory = fileSystem.getDirectory(links[i]);
      if (
        (directory as FileSystemError).type ===
        FileSystemErrorType.DIRECTORY_NOT_FOUND
      ) {
        return undefined;
      }
      fileSystem = convertFileSystem((directory as Directory).children);
    }

    let parent = fileSystem.getDirectory(links[links.length - 1]);
    if (
      (parent as FileSystemError).type ===
      FileSystemErrorType.DIRECTORY_NOT_FOUND
    ) {
      return undefined;
    }
    return parent as Directory;
  };

  directory.addFile = (file: BaseFile): File => {
    convertFileSystem(directory.children).addFile(file);

    return convertFile(file);
  };

  directory.addSubDirectory = (baseDirectory: BaseDirectory): Directory => {
    convertFileSystem(directory.children).addDirectory(baseDirectory);

    return convertDirectory(baseDirectory);
  };

  directory.hasFile = (name: string): boolean => {
    return convertFileSystem(directory.children).hasFile(name);
  };

  directory.hasSubDirectory = (name: string): boolean => {
    return convertFileSystem(directory.children).hasDirectory(name);
  };

  directory.getFile = (name: string): File | FileSystemError => {
    return convertFileSystem(directory.children).getFile(name);
  };

  directory.getSubDirectory = (name: string): Directory | FileSystemError => {
    return convertFileSystem(directory.children).getDirectory(name);
  };

  directory.deleteFile = (name: string): void => {
    return convertFileSystem(directory.children).deleteFile(name);
  };

  directory.deleteSubDirectory = (name: string): void => {
    return convertFileSystem(directory.children).deleteDirectory(name);
  };

  directory.delete = (): void => {
    directory.deleted = true;
  };

  return directory;
};
