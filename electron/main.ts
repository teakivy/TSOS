import { app, BrowserWindow, ipcMain, protocol } from 'electron';
import path from 'path';
import { saveFileSystem } from './core/FileSystem/fileManager';
import { loadSave, saveAll } from './core/SaveSystem/SaveSystemManager';

let mainWindow: BrowserWindow | null;

// Declare webpack thingys
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

/**
 * This method will be called when Electron starts.
 */
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    // icon: path.join(assetsPath, 'assets', 'icon.png'),
    width: 1100,
    height: 700,
    backgroundColor: 'black',
    autoHideMenuBar: true,
    webPreferences: {
      // disable web security, & enable isolation
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // Load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // on close, set mainWindow to null
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

/**
 * Register main listeners to send to the renderer process
 */
async function registerListeners() {
  /**
   * This comes from bridge integration, check bridge.ts
   */
  ipcMain.on('message', (_, message) => {
    mainWindow?.webContents.send('message', message);
  });

  ipcMain.on('clearMessages', (_, message) => {
    mainWindow?.webContents.send('clearMessages', message);
  });

  ipcMain.on('changeDir', (_, message) => {
    mainWindow?.webContents.send('changeDir', message);
  });

  ipcMain.on('exit', (_, message) => {
    mainWindow?.close();
  });
}

// When the app is ready, create the window
app
  .on('ready', createWindow)
  .whenReady()
  .then(() => {
    // Register listeners
    registerListeners();

    // Register a protocol "atom:///" to allow for opening local files.
    protocol.registerFileProtocol('atom', (request, callback) => {
      const url = request.url.substr(7);
      callback(decodeURI(path.normalize(url)));
    });
  })
  .catch(e => console.error(e));

// When the app is closed, quit the app if the platform is not darwin
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// When activated, if no window is open, create one
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
