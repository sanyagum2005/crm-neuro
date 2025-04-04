import { ipcMain } from 'electron';
import contactsStorage from './storage.js';

export function setupContactsAPI() {
  ipcMain.handle('contacts:get', async () => {
    return await contactsStorage.getAll();
  });
  
  ipcMain.handle('contacts:add', async (_, contact) => {
    return await contactsStorage.add({
      ...contact,
      id: Date.now().toString()
    });
  });
  
  ipcMain.handle('contacts:remove', async (_, id) => {
    return await contactsStorage.remove(id);
  });
  
  ipcMain.handle('contacts:search', async (_, query) => {
    return await contactsStorage.search(query);
  });
}