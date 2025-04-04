import ContactItem from './ContactItem';

export default function ContactList({ contacts, onContactClick, onRemoveClick }) {
  return (
    <div className="contact-list">
      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          contact={contact}
          onClick={() => onContactClick(contact)}
          onRemove={() => onRemoveClick(contact.id)}
        />
      ))}
    </div>
  );
}