import { BaseDirectory, BaseFileSystem, FileSystem } from './fileSystemTypes';
import { FileSystemError } from './fileSystemTypes';
import { convertFileSystem } from './fileSystemTypeConverter';
import { api } from '../../bridge';

// The temporary file system, until the file system has been loaded
let fileSystem: BaseFileSystem = {
  directories: [
    {
      name: 'Documents',
      children: {
        directories: [
          {
            name: 'test',
            children: {
              directories: [],
              files: [],
            },
            path: '/Documents/test',
            created: new Date(),
            deleted: false,
          },
        ],
        files: [
          {
            name: 'file1.txt',
            content: 'file1 content',
            path: '/Documents/file1.txt',
            created: new Date(),
            lastModified: new Date(),
            deleted: false,
          },
        ],
      },
      path: '/Documents',
      created: new Date(),
      deleted: false,
    },
  ],
  files: [],
};

// Set the current directory as root (/)
let currentDirectory: string = '/';

/**
 * Return the current file system
 * @returns The current file system
 */
export const getFileSystem = (): FileSystem => {
  return convertFileSystem(fileSystem);
};

/**
 * Set the file system to a new file system
 * @param newFileSystem The new file system to set
 */
export const saveFileSystem = (
  newFileSystem: BaseFileSystem | FileSystem
): void => {
  fileSystem = newFileSystem as BaseFileSystem;
};

/**
 * Set the current directory
 * @returns The current directory
 */
export const getCurrentDirectory = (): string => {
  return currentDirectory;
};

/**
 * Return the current directory as FileSystem type
 * @returns The current directory, as a FileSystem
 */
export const getCurrentDirAsFileSystem = (): FileSystem => {
  // Split the dir path
  let dirPath = currentDirectory;
  let cut = dirPath.split('/');
  let currentDir = fileSystem;
  // Convert the file system & sub directories
  for (let i = 0; i < cut.length; i++) {
    if (cut[i] === '') {
      continue;
    }
    if (convertFileSystem(currentDir).hasDirectory(cut[i])) {
      let tDir = convertFileSystem(currentDir).getDirectory(cut[i]);
      if ((tDir as FileSystemError).type) {
      }
      currentDir = (tDir as BaseDirectory).children;
    }
  }

  // Return converted file system
  return convertFileSystem(currentDir);
};

/**
 * Change the current directory based on a locational path
 * @param newDirectory The new directory to set (from current directory)
 * @returns The new directory
 */
export const changeCurrentDirectory = (newDirectory: string): void => {
  // Split the dir path
  let dirList = newDirectory.split('/');
  // If / is entered, set the current directory to root
  if (newDirectory === '/') {
    currentDirectory = formatDirPath(newDirectory);
    return;
  }

  // If the first character is /, go to that directory from root
  if (newDirectory.startsWith('/')) {
    if (doesDirExist(newDirectory)) {
      currentDirectory = formatDirPath(newDirectory);
    } else {
      api.sendError(`Directory ${newDirectory} does not exist.`);
    }
    return;
  }

  // Otherwise, go to that directory from current directory
  let cDir = currentDirectory.split('/');
  if (cDir[0] == '') {
    cDir.shift();
  }

  let newDir;

  // If the directory starts with .., go to the parent directory
  if (newDirectory.startsWith('..')) {
    cDir.pop();
    newDir = cDir.join('/');
    newDir = formatDirPath(newDir);
    if (doesDirExist(newDir)) {
      currentDirectory = newDir;
    } else {
      api.sendError(`Directory ${newDir} does not exist.`);
    }
    return;
  }

  // If it starts with ., go from the current directory
  if (newDirectory.startsWith('.')) {
    cDir.push(dirList[1]);
    newDir = cDir.join('/');
    newDir = formatDirPath(newDir);
    if (doesDirExist(newDir)) {
      currentDirectory = newDir;
    } else {
      api.sendError(`Directory ${newDir} does not exist.`);
    }
    return;
  }

  cDir.push(dirList[0]);
  newDir = cDir.join('/');
  newDir = formatDirPath(newDir);

  // Check if the directory exists, if it does, set the current directory, if not, send an error
  if (doesDirExist(newDir)) {
    currentDirectory = newDir;
  } else {
    api.sendError(`Directory ${newDir} does not exist.`);
  }
};

/**
 * Check if a directory exists
 * @param dirPath The directory path
 * @returns true if the directory exists, false otherwise
 */
export const doesDirExist = (dirPath: string): boolean => {
  // Loop through the directories until the directory is found
  let cut = dirPath.split('/');
  let currentDir = fileSystem;
  for (let i = 0; i < cut.length; i++) {
    if (cut[i] === '') {
      continue;
    }
    if (convertFileSystem(currentDir).hasDirectory(cut[i])) {
      let tDir = convertFileSystem(currentDir).getDirectory(cut[i]);
      if ((tDir as FileSystemError).type) {
        return false;
      }
      currentDir = (tDir as BaseDirectory).children;
    } else {
      return false;
    }
  }
  return true;
};

/**
 * Format the directory path, starting with / and not ending with /
 * @param dirPath The directory path to format
 * @returns Formatted directory path
 */
export const formatDirPath = (dirPath: string): string => {
  if (!dirPath.startsWith('/')) {
    dirPath = '/' + dirPath;
  }
  if (dirPath.endsWith('/') && dirPath.length > 1) {
    dirPath = dirPath.slice(0, -1);
  }
  return dirPath;
};
