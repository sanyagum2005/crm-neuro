import { useState } from 'react';
import './App.css';

export default function App() {
  const [contacts, setContacts] = useState([
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
  ]);

  const [newContact, setNewContact] = useState({
    username: '',
    organization: '',
    section: '',
    post: '',
    email: '',
    phone: ''
  });

  const addContact = () => {
    if (!newContact.username.trim()) return;
    
    setContacts([
      ...contacts,
      {
        ...newContact,
        id: Date.now().toString()
      }
    ]);
    
    setNewContact({
      username: '',
      organization: '',
      section: '',
      post: '',
      email: '',
      phone: ''
    });
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <div className="app-container">
      <h1>Список контактов</h1>
      
      <div className="contact-form">
        <input
          type="text"
          placeholder="ФИО"
          value={newContact.username}
          onChange={(e) => setNewContact({...newContact, username: e.target.value})}
        />
        <input
          type="text"
          placeholder="Организация"
          value={newContact.organization}
          onChange={(e) => setNewContact({...newContact, organization: e.target.value})}
        />
        <input
          type="text"
          placeholder="Отдел"
          value={newContact.section}
          onChange={(e) => setNewContact({...newContact, section: e.target.value})}
        />
        <input
          type="text"
          placeholder="Должность"
          value={newContact.post}
          onChange={(e) => setNewContact({...newContact, post: e.target.value})}
        />
        <input
          type="email"
          placeholder="Email"
          value={newContact.email}
          onChange={(e) => setNewContact({...newContact, email: e.target.value})}
        />
        <input
          type="tel"
          placeholder="Телефон"
          value={newContact.phone}
          onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
        />
        <button onClick={addContact}>
          Добавить контакт
        </button>
      </div>

      <div className="contacts-list">
        {contacts.map(contact => (
          <div key={contact.id} className="contact-card">
            <div className="contact-header">
              <h3>{contact.username}</h3>
              <button 
                onClick={() => deleteContact(contact.id)}
                className="delete-button"
              >
                Удалить
              </button>
            </div>
            
            <div className="contact-details">
              <div className="detail-row">
                <span className="detail-label">Организация:</span>
                <span>{contact.organization}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Отдел:</span>
                <span>{contact.section}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Должность:</span>
                <span>{contact.post}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email:</span>
                <span>{contact.email}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Телефон:</span>
                <span>{contact.phone}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}