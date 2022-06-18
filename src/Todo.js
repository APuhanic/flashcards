import React from 'react'

export default function Todo({ todo, toggleTodo }) {
    function handleTodoClick(){
        toggleTodo(todo.id)
    }
    return (
        <div>
            <label>
                {todo.name}

            </label>
        </div>
    )
}
