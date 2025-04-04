export default function ContactItem({ contact, onClick, onRemove }) {
  return (
    <div className="contact-item">
      <span onClick={onClick}>{contact.username}</span>
      <button onClick={(e) => {
        e.stopPropagation();
        onRemove();
      }}>
        Удалить
      </button>
    </div>
  );
}