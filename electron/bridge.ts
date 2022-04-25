import { contextBridge, ipcRenderer } from 'electron';
import { execute } from './core/Executables/executableManager';
import {
  getCurrentDirectory,
  getFileSystem,
  saveFileSystem,
} from './core/FileSystem/fileManager';
import { convertFileSystem } from './core/FileSystem/fileSystemTypeConverter';
import {
  BaseFileSystem,
  Directory,
  File,
  FileSystemError,
} from './core/FileSystem/fileSystemTypes';
import { BaseTextComponent } from './core/TextComponent/TextComponentTypes';

export const api = {
  /**
   * Here you can expose functions to the renderer process
   * so they can interact with the main (electron) side
   * without security problems.
   *
   * The function below can accessed using `window.Main.sendMessage`
   */

  send: (event: string, args?: any) => {
    ipcRenderer.send(event, args);
  },

  sendMessage: (message: BaseTextComponent | BaseTextComponent[]) => {
    if (!Array.isArray(message)) {
      message = [message];
    }

    message.forEach(m => {
      ipcRenderer.send('message', m);
    });
  },

  sendError: (error: string, newLine?: boolean) => {
    if (newLine === undefined) newLine = true;
    api.sendMessage({ text: error, newLine, color: 'red' });
  },

  clearMessages: () => {
    ipcRenderer.send('clearMessages');
  },

  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data));
  },

  getFile: (name: string) => {
    // return getFile(name);
  },

  fs: {
    getFileSystem: () => {
      return convertFileSystem(getFileSystem());
    },
    getCurrentDirectory: () => {
      return getCurrentDirectory();
    },
  },

  exec: {
    runCommand: (command: string, args: string[]) => {
      execute(command, args);
    },
  },

  testFS: () => {
    let fs = getFileSystem();

    let testFile = fs.addFile({
      name: 'test.txt',
      content: 'test content',
      path: '/test.txt',
      created: new Date(),
      lastModified: new Date(),
      deleted: false,
    });

    testFile.setContent('HALLOOOOOO');

    let testDir = fs.addDirectory({
      name: 'testDir',
      children: {
        directories: [],
        files: [],
      },
      path: '/testDir',
      created: new Date(),
      deleted: false,
    });

    let newDir = testDir.addSubDirectory({
      name: 'newDir',
      children: {
        directories: [],
        files: [],
      },
      path: '/testDir/newDir',
      created: new Date(),
      deleted: false,
    });

    let file = newDir.addFile({
      name: 'test2.txt',
      content: 'test content',
      path: '/testDir/newDir/test2.txt',
      created: new Date(),
      lastModified: new Date(),
      deleted: false,
    });

    file.setContent('Hello World!');

    fs.deleteFile('test.txt');

    console.log(getFileSystem());
  },
};

contextBridge.exposeInMainWorld('api', api);
