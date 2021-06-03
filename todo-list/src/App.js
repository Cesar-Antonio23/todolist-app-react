import React, { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './components/todoForm'
import Todo from './components/todo'

function App() {

    const [todos, setTodos] = useState([]);

    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return
        }

        const newTodos = [todo, ...todos]

        setTodos(newTodos);
    };

    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return
        }

        setTodos(prev => prev.map(item => (item.map === todoId ? newValue : item)))
    }

    const removeTodo = id => {
        const removeArr = [...todos].filter(todo => todo.id !== id)

        setTodos(removeArr);
    }

    const completeTodo = id => {
        let updateTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete
            }
            return todo;
        })
        setTodos(updateTodos);
    }
    // Create user
    const createUser = async () => {
        const request = await fetch('https://assets.breatheco.de/apis/fake/todos/user/cesar',
            {
                method: "POST",
                body: JSON.stringify([]),
                headers: { "Content-Type": "application/json" }
            })

        const json = await request.json();
        const data = json;
        console.log('New user response', data)
    }

    // Fetch existing data
    const fetchData = async () => {
        const settings = {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        }

        const request = await fetch(`https://assets.breatheco.de/apis/fake/todos/user/cesar`, settings);
        const json = await request.json();
        const data = json;
        setTodos(data)
    }

    // Update tasksList    
    const updateTaskUser = async () => {
        const settings = {
            method: "PUT",
            body: JSON.stringify(todos),
            headers: { "Content-Type": "application/json" }
        }

        const request = await fetch('https://assets.breatheco.de/apis/fake/todos/user/cesar', settings);
        const json = await request.json();
        const data = json;
        console.log("update response", data);
    }

    // Delete all Tasks and user
    const deleteAll = async () => {
        const request = await fetch('https://assets.breatheco.de/apis/fake/todos/user/cesar', {
            method: "DELETE"
        })
        const json = await request.json();
        const data = json
        createUser()
        fetchData()
        console.log("delete response", data)
    }

    useEffect(() => {
        createUser()
        fetchData()
    }, []);

    return (
        <div className="todo-app">
            <div>
                <h1>Cual es el plan para hoy?</h1>
                <TodoForm onSubmit={addTodo} />
                <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo}
                    updateTodo={updateTodo}
                />

                <button className="todo-button float-right m-4" variant="secondary" onClick={() => deleteAll()}>Borrar Todo</button>


            </div>
        </div>
    );
}

export default App;
