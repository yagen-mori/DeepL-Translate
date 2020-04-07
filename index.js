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

  // デスクトップ領域の大きさを取得
  const workArea = electronScreen.getPrimaryDisplay().workArea;

  // 推奨サイズ
  const initialWidth = 1300;
  const initialHeight = 640;

  // BrowserWindowを新規作成
  let win = new BrowserWindow({
    width: Math.min(workArea.width, initialWidth),
    height: Math.min(workArea.height, initialHeight),
  });

  // BrowserWindowを閉じたらアプリ終了
  win.on('closed', () => {
    win = null;
    app.quit();
  });

 // レイアウト指定用の定数
 const { width, height } = win.getBounds();
 const gTransHeight = 300;

 // Grammaly用のBrowserViewを作成
  const deepl = new BrowserView({
    webPreferences: {
      // nodeの機能を無効化
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

  //deepl.webContents.loadURL('www.deepl.com/ja/translator#en/ja/');
  deepl.webContents.loadURL('https://www.deepl.com/ja/translator#en/ja/');

  globalShortcut.register('Alt+N', function(){
      const text = Clipboard.readText();
      //mainWindow.loadURL("https://www.deepl.com/ja/translator#en/ja/welcome");
      deepl.webContents.loadURL('https://www.deepl.com/ja/translator#en/ja/'+ text);
      win.focus();
  })
});