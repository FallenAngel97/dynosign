/**
 * Open previously saved file
 */
const { dialog } = require('electron').remote;

export const openFile = () => {
  const options = {
    defaultPath: 'file.dsign',
    filters: [{
      name: 'DynoSign files',
      extensions: ['dsign']
    }, {
      name: 'PNG image',
      extensions: ['png']
    }, {
      name: 'JPEG image',
      extensions: ['jpeg', 'jpg']
    }],
    properties: ['openFile']
  };
  const fileName = dialog.showOpenDialog(options);
}

/**
 * Display settings page
 */
export const openSettings = () => {
  const appUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:8080/dist/' : '';
  window.open(appUrl + 'settings.html?language=' + window.language, '_blank', 'nodeIntegration=yes');
}
