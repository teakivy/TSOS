import * as fs from 'fs';
import {
  getAliases,
  getHistory,
  setAliases,
  setHistory,
} from '../Executables/executableManager';
import { getFileSystem, saveFileSystem } from '../FileSystem/fileManager';
import { SaveSystem } from './SaveSystemTypes';

// The appdata path based on OS
let appData =
  process.env.APPDATA ||
  (process.platform == 'darwin'
    ? process.env.HOME + '/Library/Preferences'
    : process.env.HOME + '/.local/share');

/**
 * Get the save file path
 * @returns The path to the save file
 */
export const getSavePath = (): string => {
  return `${appData}/TSOS/saves/main.tsos`;
};

/**
 * Save the current system to a file
 */
export const saveAll = () => {
  let save: SaveSystem = {
    fileSystem: getFileSystem(),
    commandHistory: getHistory(),
    aliases: getAliases(),
  };

  fs.writeFile(getSavePath(), JSON.stringify(save), (err: any) => {
    if (err) {
      console.log(err);
    }
  });
};

/**
 * Load the system from a file
 */
export const loadSave = () => {
  if (!fs.existsSync(getSavePath())) {
    return;
  }
  fs.readFile(getSavePath(), (err: any, data: any) => {
    if (err) {
      console.log(err);
    } else {
      let save: SaveSystem = JSON.parse(data.toString());
      if (save.fileSystem) {
        saveFileSystem(save.fileSystem);
      }
      if (save.commandHistory) {
        setHistory(save.commandHistory);
      }
      if (save.aliases) {
        setAliases(save.aliases);
      }
    }
  });
};
