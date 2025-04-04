import { useState, useEffect } from 'react';
import ContactList from './components/ContactList';
import SearchBar from './components/SearchBar';
import './styles.css';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [activeContact, setActiveContact] = useState(null);
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    const contacts = await window.electronAPI.invoke('contacts:get');
    setContacts(contacts);
  };

  const handleAddContact = async (username) => {
    if (!username.trim()) return;
    
    await window.electronAPI.invoke('contacts:add', { 
      username,
      organization: '',
      section: '',
      post: '',
      email: '',
      phone: ''
    });
    await loadContacts();
  };

  const handleRemoveContact = async (id) => {
    await window.electronAPI.invoke('contacts:remove', id);
    setActiveContact(null);
    await loadContacts();
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }
    const results = await window.electronAPI.invoke('contacts:search', query);
    setSearchResults(results);
  };

  const displayContacts = searchResults || contacts;

  return (
    <main>
      <div className="left-main-side">
        <h1 className="contacts-title">Список контактов</h1>
        <SearchBar 
          onAdd={handleAddContact} 
          onSearch={handleSearch}
        />
        <ContactList
          contacts={displayContacts}
          onContactClick={setActiveContact}
          onRemoveClick={handleRemoveContact}
        />
      </div>
      <div className="right-main-side">
        {!activeContact ? (
          <div className="no-contact-message">
            <h3>Откройте контакт нажав по его имени в левом меню</h3>
          </div>
        ) : (
          <div className="contact-profile">
            <div className="contact-profile-name">{`Контакт ${activeContact.username}`}</div>
            <div className="contact-profile-organization">{activeContact.organization}</div>
            <div className="contact-profile-section">{activeContact.section}</div>
            <div className="contact-profile-post">{activeContact.post}</div>
            <div className="contact-profile-email">{activeContact.email}</div>
            <div className="contact-profile-phone">{activeContact.phone}</div>
          </div>
        )}
      </div>
    </main>
  );
}