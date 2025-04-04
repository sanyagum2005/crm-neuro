import { app, BrowserWindow, Menu } from 'electron';
import { setupContactsAPI } from './contacts/api.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let mainWindow;

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1080,
    height: 760,
  });

  Menu.setApplicationMenu(null);

  setupContactsAPI();

  await mainWindow.loadURL('http://localhost:3000');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
})