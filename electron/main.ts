import { app, BrowserWindow, ipcMain, protocol } from 'electron';
import path from 'path';

let mainWindow: BrowserWindow | null;

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// const assetsPath =
//   process.env.NODE_ENV === 'production'
//     ? process.resourcesPath
//     : app.getAppPath()

function createWindow() {
  mainWindow = new BrowserWindow({
    // icon: path.join(assetsPath, 'assets', 'icon.png'),
    width: 1100,
    height: 700,
    backgroundColor: 'black',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}
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

app
  .on('ready', createWindow)
  .whenReady()
  .then(() => {
    registerListeners();

    // Register a protocol "atom:///" to allow for opening local files.
    protocol.registerFileProtocol('atom', (request, callback) => {
      const url = request.url.substr(7);
      callback(decodeURI(path.normalize(url)));
    });
  })
  .catch(e => console.error(e));

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
