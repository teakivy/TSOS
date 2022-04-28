import { saveFileSystem } from './fileManager';
import { BaseFileSystem } from './fileSystemTypes';

/**
 * Removes deleted files and directories from the file system
 * @param fileSystem File system to remove deleted files from
 * @returns A new file system with deleted files removed
 */
export const removeDeletedFiles = (fileSystem: BaseFileSystem) => {
  // Create a new blank file system
  let newFileSystem: BaseFileSystem = {
    directories: [],
    files: [],
  };
  // Loop through each directory
  for (let i = 0; i < fileSystem.directories.length; i++) {
    // Recursively remove deleted files and directories
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

  // Loop through each file, if it is marked as deleted, remove it
  for (let i = 0; i < fileSystem.files.length; i++) {
    let file = fileSystem.files[i];
    if (file.deleted) {
      continue;
    }
    newFileSystem.files.push(file);
  }

  // The new file system is the old file system with deleted files removed
  return newFileSystem;
};

/**
 * Initializes a new file system
 */
export const initFileSystem = () => {
  // Create a file system with a document directory containing help.txt.
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

  // Save the file system
  saveFileSystem(fileSystem);
};
