import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState(fetchTodos());
  const [title, setTitle] = useState('');

  function fetchTodos() {
    var initialTodos = [];
    fetch('https://localhost:5001/api/Todo')
        .then(response => response.json())
        .then((data) => data.data.forEach((el) => {
            initialTodos.push({id: el.id, title: el.title, isCompleted: el.isCompleted});
        }))

        return initialTodos;
  }

//   useEffect(() => {
//       fetchTodos();
//   }, []);

  function addTodo() {
      fetch('https://localhost:5001/api/Todo', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title: title, isCompleted: false })
      })
      .then(response => response.json())
      .then((data) => {
        setTodos([
            {id: data.data.id, title: data.data.title, isCompleted: data.data.isCompleted},
             ...todos]);
          setTitle('');
      });
  }

  function toggleTodo(id) {
      fetch(`https://localhost:5001/api/Todo/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
            },
          body: JSON.stringify({ id: id, title:title })
      }).then(() => {
          //fetchTodos();
      });
  }

  function deleteTodo(id) {
      fetch('https://localhost:5001/api/Todo', {
          method: 'DELETE',
          body: id
      }).then(() => {
          //fetchTodos();
      });
  }

  return (
    <div className="App">
      
      <h1>Todo List</h1>
            <input value={title} onChange={e => setTitle(e.target.value)} />&nbsp;
            <button onClick={addTodo}>Add</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <span
                            style={{
                                textDecoration: todo.isCompleted ? 'line-through' : 'none'
                            }}
                        >
                            {todo.title}
                        </span>
                        <button onClick={() => toggleTodo(todo.id)}>Toggle</button>
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
    </div>
  );
}

export default App;
