"use client"; 
import React, { useEffect, useState } from 'react';
import styles from '../styles/TodoList.module.css';


interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim() === '') return;

    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInput('');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <h1>To-Do List อิอิ</h1>
      <input className={styles.todoInput} 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="ใส่ ข้อความ ตรงนี้ๆ" 
      />
      <button className={styles.todoButton} onClick={addTodo}>เพิ่ม</button>
      <ul className={styles.todoList}>
        {todos.map(todo => (
          <li className={styles.todoItem} key={todo.id}>
            <span 
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }} 
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>ลบจ้า</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
