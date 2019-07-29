/* eslint-disable curly */
const { ipcMain, app, BrowserWindow } = require('electron');
const fs = require('fs');
var fontManager = require('font-manager');
const Store = require('electron-store');
const store = new Store();

let win;

function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: process.env.NODE_ENV === 'development'
    }
  });
  let language = store.get('language', 'en');
  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:8080/dist/index.html?language=' + language);
    win.webContents.openDevTools();
  } else
    win.loadFile('index.html?language' + language);
  win.on('closed', () => {
    win = null
  })
  win.maximize();
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
  const extension = payload.fileName.split('.')[1];
  console.log(extension);
  switch (extension) {
    case 'jpg':
    case 'jpeg':
      fs.writeFile(payload.fileName, payload.image, 'base64', (err) => {
        console.log(err);
      });
      break;
    default:
      fs.writeFile(payload.fileName, JSON.stringify({
        layers: payload.layers,
        lastUsedFont: payload.lastUsedFont,
        lastUsedColor: payload.lastUsedColor
      }), (err) => {
        console.log(err);
      })
      break;
  }
})

ipcMain.on('change-language', (event, language) => {
  console.log(language.value);
  store.set('language', language.value);
  win.webContents.send('change-language', language.value);
});

ipcMain.on('getfonts', (event, arg) => {
  var fonts = fontManager.getAvailableFontsSync();
  event.returnValue = fonts;
});
