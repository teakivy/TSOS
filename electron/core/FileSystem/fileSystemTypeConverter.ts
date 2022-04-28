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

/**
 * Convert a BaseFileSystem to a FileSystem, with logic
 * @param baseFileSystem The base file system to convert
 * @returns Converted file system, including methods
 */
export const convertFileSystem = (
  baseFileSystem: BaseFileSystem
): FileSystem => {
  // New file system, with unimplemented methods
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

  // Implement methods

  /**
   * Get all files in the file system
   * @returns All files in the file system
   */
  fileSystem.getFiles = (): File[] => {
    return fileSystem.files.map((file: BaseFile) => convertFile(file));
  };

  /**
   * Get all directories in the file system
   * @returns All directories in the file system
   */
  fileSystem.getDirectories = (): Directory[] => {
    return fileSystem.directories.map((directory: BaseDirectory) =>
      convertDirectory(directory)
    );
  };

  /**
   * Add a file to the file system
   * @param baseFile the file to add to the file system
   * @returns A converted file
   */
  fileSystem.addFile = (baseFile: BaseFile): File => {
    fileSystem.files.push(baseFile);

    return convertFile(baseFile);
  };

  /**
   * Add a directory to the file system
   * @param baseDirectory the directory to add to the file system
   * @returns A converted directory
   */
  fileSystem.addDirectory = (baseDirectory: BaseDirectory): Directory => {
    fileSystem.directories.push(baseDirectory);

    return convertDirectory(baseDirectory);
  };

  /**
   * Delete a file from the file system
   * @param name The name of the file to delete
   */
  fileSystem.deleteFile = (name: string): void => {
    // Check if file exists
    const fileIndex = fileSystem.files.findIndex(
      (file: BaseFile) => file.name === name
    );

    // If file exists, delete it
    if (fileIndex !== -1) {
      fileSystem.files[fileIndex].deleted = true;
    }

    // Remove deleted files, and update file system
    saveFileSystem(removeDeletedFiles(getFileSystem()));
  };

  /**
   * Delete a directory from the file system
   * @param name The name of the directory to delete
   */
  fileSystem.deleteDirectory = (name: string): void => {
    // Check if directory exists
    const dirIndex = fileSystem.directories.findIndex(
      (directory: BaseDirectory) => directory.name === name
    );

    // If directory exists, delete it
    if (dirIndex !== -1) {
      fileSystem.directories[dirIndex].deleted = true;
    }

    // Remove deleted directories, and update file system
    saveFileSystem(removeDeletedFiles(getFileSystem()));
  };

  /**
   * Check if a file exists in the file system
   * @param name The name of the file to check
   * @returns true if the file exists, false otherwise
   */
  fileSystem.hasFile = (name: string): boolean => {
    return fileSystem.files.some((file: BaseFile) => file.name === name);
  };

  /**
   * Check if a directory exists in the file system
   * @param name The name of the directory to check
   * @returns true if the directory exists, false otherwise
   */
  fileSystem.hasDirectory = (name: string): boolean => {
    return fileSystem.directories.some(
      (directory: BaseDirectory) => directory.name === name
    );
  };

  /**
   * Get a file from the file system with logic by name
   * @param name The name of the file to get
   * @returns The converted file, or a FileSystemError if the file does not exist
   */
  fileSystem.getFile = (name: string): File | FileSystemError => {
    // Check if file exists
    let file: BaseFile | undefined = fileSystem.files.find(
      (file: BaseFile) => file.name === name
    );

    // If file exists, return it
    if (file) {
      return convertFile(file);
    }

    // If file does not exist, return error
    return {
      type: FileSystemErrorType.FILE_NOT_FOUND,
      message: `File ${name} not found.`,
    };
  };

  /**
   * Get a directory from the file system with logic by name
   * @param name The name of the directory to get
   * @returns The converted directory, or a FileSystemError if the directory does not exist
   */
  fileSystem.getDirectory = (name: string): Directory | FileSystemError => {
    // Check if directory exists
    let directory: BaseDirectory | undefined = fileSystem.directories.find(
      (directory: BaseDirectory) => directory.name === name
    );

    // If directory exists, return it
    if (directory) {
      return convertDirectory(directory);
    }

    // If directory does not exist, return error
    return {
      type: FileSystemErrorType.DIRECTORY_NOT_FOUND,
      message: `Directory ${name} not found.`,
    };
  };

  // Return converted file system
  return fileSystem;
};

/**
 * Convert a base file to a file
 * @param baseFile The file to convert
 * @returns A converted file
 */
export const convertFile = (baseFile: BaseFile): File => {
  // The new file, with unimplemented methods
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

  /**
   * Check if the file exists
   * @returns true if the file exists, false otherwise
   */
  file.exists = (): boolean => {
    // If the file is deleted, return false
    if (file.deleted) {
      return false;
    }

    // Otherwise, find the parent directory
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

    // If the file is found, return true
    return fileSystem.hasFile(links[links.length - 1]);
  };

  /**
   * Get the extension of the file
   * @returns The file's extension
   */
  file.getExtension = (): string => {
    return file.name.split('.').pop() || '';
  };

  /**
   * Get the name of the file
   * @returns The file's name
   */
  file.getName = (): string => {
    return file.name;
  };

  /**
   * Get the path of the file
   * @returns The file's path
   */
  file.getPath = (): string => {
    return file.path;
  };

  /**
   * Set the content of the file
   * @param content The new content of the file
   */
  file.setContent = (content: string): void => {
    file.content = content;

    file.lastModified = new Date();

    file.save();
  };

  /**
   * Get the content of the file
   * @returns The file's content
   */
  file.getContent = (): string => {
    return file.content;
  };

  /**
   * Delete the file
   */
  file.delete = (): void => {
    file.deleted = true;
  };

  // Temporary file system
  let totalFS = getFileSystem();
  /**
   * Save the file
   */
  file.save = (): void => {
    // Make a modifyable copy of the file system
    let fs = totalFS;

    // Find the parent directory
    let links = file.path.split('/');
    links.shift();

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

    // Delete the file, and add it back with the new content
    fs.deleteFile(file.name);
    fs.addFile(file);

    // Update the file system to remove the old file
    saveFileSystem(removeDeletedFiles(fs));
  };

  // Return the converted file
  return file;
};

/**
 * Convert a base directory to a directory
 * @param baseDirectory The directory to convert
 * @returns The converted directory
 */
export const convertDirectory = (baseDirectory: BaseDirectory): Directory => {
  // The new directory, with unimplemented methods
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

  /**
   * Check if the directory exists
   * @returns true if the directory exists, false otherwise
   */
  directory.exists = (): boolean => {
    // If the directory is deleted, return false
    if (directory.deleted) {
      return false;
    }

    // Otherwise, find the parent directory
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

    // If the directory is found, return true
    return fileSystem.hasDirectory(links[links.length - 1]);
  };

  /**
   * Get the name of the directory
   * @returns The directory's name
   */
  directory.getName = (): string => {
    return directory.name;
  };

  /**
   * Get the path of the directory
   * @returns The directory's path
   */
  directory.getPath = (): string => {
    return directory.path;
  };

  /**
   * Get the children of the directory
   * @returns The directory's children as a file system
   */
  directory.getChildren = (): FileSystem => {
    return convertFileSystem(directory.children);
  };

  /**
   * Get the files in the directory
   * @returns The files in the directory
   */
  directory.getFiles = (): File[] => {
    return convertFileSystem(directory.children).getFiles();
  };

  /**
   * Get the sub-directories in the directory
   * @returns The sub-directories in the directory
   */
  directory.getSubDirectories = (): Directory[] => {
    return convertFileSystem(directory.children).getDirectories();
  };

  /**
   * Get the parent directory
   * @returns The parent directory, if it exists, undefined otherwise
   */
  directory.getParent = (): Directory | undefined => {
    // Find the parent directory
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

    // Get the parent directory
    let parent = fileSystem.getDirectory(links[links.length - 1]);
    // If the parent directory is not found, return undefined
    if (
      (parent as FileSystemError).type ===
      FileSystemErrorType.DIRECTORY_NOT_FOUND
    ) {
      return undefined;
    }

    // Otherwise, return the parent directory
    return parent as Directory;
  };

  /**
   * Add a file to the directory
   * @param file The file to add
   * @returns The converted file
   */
  directory.addFile = (file: BaseFile): File => {
    convertFileSystem(directory.children).addFile(file);

    return convertFile(file);
  };

  /**
   * Add a sub-directory to the directory
   * @param baseDirectory The directory to add
   * @returns The converted directory
   */
  directory.addSubDirectory = (baseDirectory: BaseDirectory): Directory => {
    convertFileSystem(directory.children).addDirectory(baseDirectory);

    return convertDirectory(baseDirectory);
  };

  /**
   * Check if the directory has a file
   * @param name The name of the file to check
   * @returns true if the directory has the file, false otherwise
   */
  directory.hasFile = (name: string): boolean => {
    return convertFileSystem(directory.children).hasFile(name);
  };

  /**
   * Check if the directory has a sub-directory
   * @param name The name of the sub-directory to check
   * @returns true if the directory has the sub-directory, false otherwise
   */
  directory.hasSubDirectory = (name: string): boolean => {
    return convertFileSystem(directory.children).hasDirectory(name);
  };

  /**
   * Get a file in the directory
   * @param name The name of the file to get
   * @returns The file if it exists, a file system error otherwise
   */
  directory.getFile = (name: string): File | FileSystemError => {
    return convertFileSystem(directory.children).getFile(name);
  };

  /**
   * Get a sub-directory in the directory
   * @param name The name of the sub-directory to get
   * @returns The sub-directory if it exists, a file system error otherwise
   */
  directory.getSubDirectory = (name: string): Directory | FileSystemError => {
    return convertFileSystem(directory.children).getDirectory(name);
  };

  /**
   * Delete a file in the directory
   * @param name The name of the file to delete
   * @returns The file if it exists, a file system error otherwise
   */
  directory.deleteFile = (name: string): void => {
    return convertFileSystem(directory.children).deleteFile(name);
  };

  /**
   * Delete a sub-directory in the directory
   * @param name The name of the sub-directory to delete
   * @returns The sub-directory if it exists, a file system error otherwise
   */
  directory.deleteSubDirectory = (name: string): void => {
    return convertFileSystem(directory.children).deleteDirectory(name);
  };

  /**
   * Delete the directory
   */
  directory.delete = (): void => {
    directory.deleted = true;
  };

  // Return the converted directory
  return directory;
};
