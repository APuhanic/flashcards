import React, { useState, useRef, useEffect } from 'react';
import TodoList from '../TodoList';
import { v4 as uuidv4 } from 'uuid'


const LOCAL_STORAGE_KEY = 'todoApp.todos'

export default function TodoPage() {
    const [todos, setTodos] = useState([])
  const todoNameRef = useRef()
  const [isPending, setIsPending] = useState(true)

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
    setIsPending(false);
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    console.log(LOCAL_STORAGE_KEY)
  }, [todos])



  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { name: name, complete: false }]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const TodosToClear = todos.filter(todo => !todo.complete)
    setTodos(TodosToClear)
  }

  return (
    <div>
      <p>asdfasdfas</p>
    {todos && <TodoList todos={todos}  />}
    <input ref={todoNameRef} type="text" onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()} />
    <button onClick={handleAddTodo} >Add Todo</button>
    <button onClick={handleClearTodos}>Clear Todo</button>
    <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </div>
  )
}
