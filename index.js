const electron = require('electron');
const globalShortcut = electron.globalShortcut;
const Clipboard = electron.clipboard;
const { app, BrowserView, BrowserWindow } = require('electron');

let mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  const electronScreen = electron.screen;

  // Get the size of the desktop area
  const workArea = electronScreen.getPrimaryDisplay().workArea;

  // Recommended size
  const initialWidth = 1300;
  const initialHeight = 640;

  // Create a new BrowserWindow
  let win = new BrowserWindow({
    width: Math.min(workArea.width, initialWidth),
    height: Math.min(workArea.height, initialHeight),
  });

  // Close BrowserWindow and close the application
  win.on('closed', () => {
    win = null;
    app.quit();
  });

  // layout constants
  const { width, height } = win.getBounds();
  const gTransHeight = 300;

  // Create a BrowserView for deepl
  const deepl = new BrowserView({
    webPreferences: {
      // Disable node functionality
      nodeIntegration: false,
    }
  });
  win.setBrowserView(deepl);

  deepl.setBounds({
    x: 0,
    y: 0,
    width: width,
    height: height
  });

  deepl.webContents.loadURL('https://www.deepl.com/');

  globalShortcut.register('Alt+N', function(){
      const text = Clipboard.readText();
      deepl.webContents.loadURL('https://www.deepl.com/ja/translator#en/ja/'+ text);
      win.show();
  })
});