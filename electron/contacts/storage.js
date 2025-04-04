import { app } from 'electron';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contactsPath = path.join(app.getPath('userData'), 'contacts.json');

async function readContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [
      {
        id: "1",
        username: "Иван Иванов",
        organization: "ООО Технологии",
        section: "Разработка",
        post: "Инженер",
        email: "ivan@example.com",
        phone: "+79991234567"
      },
      {
        id: "2",
        username: "Мария Петрова",
        organization: "АО Консалтинг",
        section: "Маркетинг",
        post: "Менеджер",
        email: "maria@example.com",
        phone: "+79998765432"
      }
    ];
  }
}

async function writeContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

export default {
  async getAll() {
    return await readContacts();
  },
  
  async add(contact) {
    const contacts = await readContacts();
    contacts.push(contact);
    await writeContacts(contacts);
    return contact;
  },
  
  async remove(id) {
    const contacts = await readContacts();
    const filtered = contacts.filter(c => c.id !== id);
    await writeContacts(filtered);
    return filtered;
  },
  
  async search(query) {
    const contacts = await readContacts();
    return contacts.filter(c => 
      c.username.toLowerCase().includes(query.toLowerCase())
    );
  }
};