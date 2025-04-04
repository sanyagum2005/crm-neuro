import { useState } from 'react';

export default function SearchBar({ onAdd, onSearch }) {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    onAdd(input);
    setInput('');
  };

  const handleSearch = () => {
    onSearch(input);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Введите имя"
      />
      <button onClick={handleAdd}>Добавить</button>
      <button onClick={handleSearch}>Поиск</button>
    </div>
  );
}