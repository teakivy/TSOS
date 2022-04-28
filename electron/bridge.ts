import { contextBridge, ipcRenderer } from 'electron';
import { execute, getHistory } from './core/Executables/executableManager';
import {
  getCurrentDirectory,
  getFileSystem,
} from './core/FileSystem/fileManager';
import { convertFileSystem } from './core/FileSystem/fileSystemTypeConverter';
import { loadSave, saveAll } from './core/SaveSystem/SaveSystemManager';
import { BaseTextComponent } from './core/TextComponent/TextComponentTypes';

export const api = {
  /**
   * Here you can expose functions to the renderer process
   * so they can interact with the main (electron) side
   * without security problems.
   *
   * The function below can accessed using `window.Main.sendMessage`
   */

  /**
   * Send a message to the renderer process
   * @param event Event name
   * @param args Arguments
   */
  send: (event: string, args?: any) => {
    ipcRenderer.send(event, args);
  },

  /**
   * Send a message to the screen
   * @param message Components to send
   */
  sendMessage: (message: BaseTextComponent | BaseTextComponent[]) => {
    // Allow for 1 component, or multiple with one call
    if (!Array.isArray(message)) {
      message = [message];
    }

    message.forEach(m => {
      ipcRenderer.send('message', m);
    });
  },

  /**
   * Send an error message to the user
   * @param error Error to send
   * @param newLine Whether to add a new line after the error (default: true)
   */
  sendError: (error: string, newLine: boolean = true) => {
    api.sendMessage({ text: error, newLine, color: 'red' });
  },

  /**
   * Clear the screen
   */
  clearMessages: () => {
    ipcRenderer.send('clearMessages');
  },

  /**
   * Subscribe to an event
   * @param channel Channel to subscribe to
   * @param callback Callback to call when the channel is called
   */
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data));
  },

  /**
   * File system functions
   */
  fs: {
    /**
     * Get the file system
     * @returns The file system
     */
    getFileSystem: () => {
      return convertFileSystem(getFileSystem());
    },
    /**
     * Get the current directory
     * @returns The current directory
     */
    getCurrentDirectory: () => {
      return getCurrentDirectory();
    },
  },

  /**
   * Command execution functions
   */
  exec: {
    /**
     * Run a command
     * @param command Command to execute
     * @param args Arguments to pass to the command
     */
    runCommand: (command: string, args: string[]) => {
      execute(command, args);
    },
  },

  /**
   * Command history functions
   */
  commands: {
    /**
     * Get the command history
     * @returns The command history
     */
    getHistory: () => {
      return getHistory();
    },
  },

  /**
   * Load the save system
   */
  loadSave: () => {
    loadSave();
  },

  /**
   * Save the save system
   */
  saveAll: () => {
    saveAll();
  },
};

// Register the 'api' object as a global variable (window.api)
contextBridge.exposeInMainWorld('api', api);
