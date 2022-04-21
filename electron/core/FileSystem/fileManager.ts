import fs from 'fs';
import { findInList } from '../utils';
import {
  BaseDirectory,
  BaseFileSystem,
  Directory,
  FileSystem,
} from './fileSystemTypes';
import { FileSystemError } from './fileSystemTypes';
import { convertDirectory, convertFileSystem } from './fileSystemTypeConverter';
import { api } from '../../bridge';

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

let currentDirectory: string = '/';

export const getFileSystem = (): FileSystem => {
  return convertFileSystem(fileSystem);
};

export const saveFileSystem = (
  newFileSystem: BaseFileSystem | FileSystem
): void => {
  fileSystem = newFileSystem as BaseFileSystem;
};

export const getCurrentDirectory = (): string => {
  return currentDirectory;
};

export const getCurrentDirAsFileSystem = (): FileSystem => {
  let dirPath = currentDirectory;
  let cut = dirPath.split('/');
  let currentDir = fileSystem;
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
  return convertFileSystem(currentDir);
};

export const changeCurrentDirectory = (newDirectory: string): void => {
  let dirList = newDirectory.split('/');
  if (newDirectory === '/') {
    currentDirectory = formatDirPath(newDirectory);
    return;
  }

  if (newDirectory.startsWith('/')) {
    if (doesDirExist(newDirectory)) {
      currentDirectory = formatDirPath(newDirectory);
    } else {
      api.sendError(`Directory ${newDirectory} does not exist.`);
    }
    return;
  }

  let cDir = currentDirectory.split('/');
  if (cDir[0] == '') {
    cDir.shift();
  }

  let newDir;
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
  if (doesDirExist(newDir)) {
    currentDirectory = newDir;
  } else {
    api.sendError(`Directory ${newDir} does not exist.`);
  }
};

export const doesDirExist = (dirPath: string): boolean => {
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

export const formatDirPath = (dirPath: string): string => {
  if (!dirPath.startsWith('/')) {
    dirPath = '/' + dirPath;
  }
  if (dirPath.endsWith('/') && dirPath.length > 1) {
    dirPath = dirPath.slice(0, -1);
  }
  return dirPath;
};
