import React, {useState} from 'react'
import TodoForm from './todoForm'
import Todo from './todo'

function TodoList() {
    const [todos, setTodos] = useState([]);

    const addTodo = todo=>{
        if(!todo.text || /^\s*$/.test(todo.text)){
            return 
        }

        const newTodos = [todo, ...todos]

        setTodos(newTodos);
    }

    const completeTodo = id =>{
        let updateTodos = todos.map(todo =>{
            if(todo.id === id){
                todo.isComplete = !todo.isComplete
            }
            return todo;
        })
        setTodos(updateTodos);
    }

    return (
        <div>
            <h1>Cual es el plan para hoy?</h1>
            <TodoForm onSubmit={addTodo}/>
            <Todo todos={todos} completeTodo={completeTodo}/>
        </div>
    )
}

export default TodoList
