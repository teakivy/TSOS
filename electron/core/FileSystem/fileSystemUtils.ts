import { getFileSystem, saveFileSystem } from './fileManager';
import { BaseDirectory, BaseFile, BaseFileSystem } from './fileSystemTypes';

export const removeDeletedFiles = (fileSystem: BaseFileSystem) => {
  let newFileSystem: BaseFileSystem = {
    directories: [],
    files: [],
  };
  for (let i = 0; i < fileSystem.directories.length; i++) {
    let dir = fileSystem.directories[i];
    if (dir.deleted) {
      continue;
    }
    newFileSystem.directories.push({
      name: dir.name,
      children: removeDeletedFiles(dir.children),
      path: dir.path,
      created: dir.created,
      deleted: dir.deleted,
    });
  }

  for (let i = 0; i < fileSystem.files.length; i++) {
    let file = fileSystem.files[i];
    if (file.deleted) {
      continue;
    }
    newFileSystem.files.push(file);
  }

  return newFileSystem;
};

export const initFileSystem = () => {
  let fileSystem: BaseFileSystem = {
    directories: [
      {
        name: 'Documents',
        children: {
          directories: [],
          files: [
            {
              name: 'help.txt',
              content: 'Hi! This is help testing file.',
              path: '/Documents/test.txt',
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

  saveFileSystem(fileSystem);
};
