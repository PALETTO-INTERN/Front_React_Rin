import { useState, useEffect } from 'react';
import './App.css'; // 👈 스타일 분리

function App() {
  const [todos, setTodos] = useState(['공부하기', '운동하기']);
  const [newTodo, setNewTodo] = useState('');
  const [likes, setLikes] = useState({});

  useEffect(() => {
    if (newTodo) {
      setTodos(prev => [...prev, newTodo]);
      setLikes(prev => ({ ...prev, [newTodo]: 0 }));
      setNewTodo('');
    }
  }, [newTodo]);

  const handleDelete = (todoToDelete) => {
    setTodos(todos.filter(todo => todo !== todoToDelete));
    setLikes(prev => {
      const updated = { ...prev };
      delete updated[todoToDelete];
      return updated;
    });
  };

  const handleLike = (todo) => {
    setLikes(prev => ({
      ...prev,
      [todo]: (prev[todo] || 0) + 1,
    }));
  };

  return (
    <div className="app-container">
      <h1 className="title">📋 TODO LIST</h1>

      <ul className="todo-list">
        {todos.map((todo, idx) => (
          <li key={idx} className="todo-item">
            <span>✅ {todo}</span>
            <div className="actions">
              <button className="like-btn" onClick={() => handleLike(todo)}>
                ❤️ {likes[todo] || 0}
              </button>
              <button className="delete-btn" onClick={() => handleDelete(todo)}>
                삭제
              </button>
            </div>
          </li>
        ))}
      </ul> 
      <div className="input-section">
        <input
          type="text"
          placeholder="새 할 일 입력 후 Enter"
          className="todo-input"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.target.value.trim()) {
              setNewTodo(e.target.value.trim());
            }
          }}
        />
      </div>
    </div>
  );
}

export default App;
