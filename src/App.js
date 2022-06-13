import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid'
import { Route, Router, Routes, useNavigate } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    console.log(LOCAL_STORAGE_KEY)
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const TodosToClear = todos.filter(todo => !todo.complete)
    setTodos(TodosToClear)
  }

  return (
    <>
      <div className='App'>
        
        <Navbar />
        <div className='content'>
          <TodoList todos={todos} toggleTodo={toggleTodo} />
          <input ref={todoNameRef} type="text" onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()} />
          <button onClick={handleAddTodo} >Add Todo</button>
          <button onClick={handleClearTodos}>Clear Todo</button>
          <div>{todos.filter(todo => !todo.complete).length} left to do</div>
        </div>
      </div>
    </>
  );
}

export default App;
