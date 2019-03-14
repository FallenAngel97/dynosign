/* eslint-disable curly */
const { ipcMain, app, BrowserWindow } = require('electron');
const fs = require('fs');
var fontManager = require('font-manager');

let win;

function createWindow () {
  win = new BrowserWindow({ width: 800, height: 600, frame: false });
  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:8080/dist/index.html');
    win.webContents.openDevTools();
  } else
    win.loadFile('index.html');
  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

ipcMain.on('save-message', (event, payload) => {
  fs.writeFile(payload.fileName, JSON.stringify(payload.layers), (err) => {
    console.log(err);
  })
})

ipcMain.on('getfonts', (event, arg) => {
  var fonts = fontManager.getAvailableFontsSync();
  event.returnValue = fonts;
});
