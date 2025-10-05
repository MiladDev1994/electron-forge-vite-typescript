let WindowInstance: any
import { BrowserWindow, app, session, protocol, ProtocolResponse } from "electron";
import path from "path";
import started from 'electron-squirrel-startup';

if (started) {
  app.quit();
}

class WindowSingleton {
  private window?: BrowserWindow;
  constructor() {
    if (WindowInstance) {
      throw new Error("You can only create one instance!");
    }
    WindowInstance = this;
    app.on('ready', async () => {
      this.window = await this.createWindow()
      this.showImageAccess()
    });
  }

  private async createWindow(): Promise<BrowserWindow> {
    const mainWindow = new BrowserWindow({
      height: 768,
      width: 1024,
      // frame: false,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        webSecurity: false,
        preload: path.join(__dirname, 'preload.js'),
      },
    });

    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
      mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    } else {
      mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
    }

    mainWindow.maximize()
    mainWindow.setMenuBarVisibility(false)
    // mainWindow.webContents.openDevTools();
    return mainWindow
  };

  private showImageAccess() {
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
        callback({
            responseHeaders: {
                ...details.responseHeaders,
                'Content-Security-Policy': [
                    "'connect-src' 'self' 'unsafe-inline' 'unsafe-eval' data:; img-src 'self' data: file: filee:;",
                ],
            },
        });
    });
    protocol.registerFileProtocol('filee', (request, callback) => {
        const url = request.url.replace('filee://getMediaFile/', '');
        try {
            return callback(url);
        } catch (error) {
            console.error(error);
            return callback(404 as ProtocolResponse);
        }
    });
  } 

  public getWindow() {
    return this.window
  }
}

const WINDOW = new WindowSingleton()
export default WINDOW;
