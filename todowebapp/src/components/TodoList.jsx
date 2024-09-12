﻿import { useState } from 'react';
import './Todo.css';
import TodoItem from './TodoItem';
import { v4 as uuidv4 } from 'uuid';

/**
 * Todo component represents the main TODO list application.
 * It allows users to add new tasks, delete tasks, and move tasks up or down in the list.
 * The component maintains the state of the task list and the new task input.
 */
function TodoList() {
    const [tasks, setTasks] = useState([
        { id: '233f07fe-53b1-4c0e-a280-795241439c9e', text: 'Drink some coffee'},
        { id: '859ebe1b-8c5e-4a77-a525-70045f6a7f3b', text: 'Create a TODO app'},
        { id: '130fc1f4-1063-4f5a-b4f4-88dda385e04f', text: 'Drink some more coffee'}]);
    const [newTaskText, setNewTaskText] = useState('');

    function handleInputChange(event) {
        setNewTaskText(event.target.value);
    }

    function addTask() {
        if (newTaskText.trim()) {
            setTasks(t => [...t, { id:uuidv4(), text:newTaskText}]);
            setNewTaskText('');
        }
    }

    function deleteTask(id) {
        const updatedTasks = tasks.filter(task=>task.id != id);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    return (
        <div id="main">
            <h1>TODO</h1>
            <div id="todo-input">
                <input
                    type="text"
                    placeholder="Enter a task"
                    value={newTaskText}
                    onChange={handleInputChange} />
                <button
                    className="add-button"
                    onClick={addTask}>
                    Add
                </button>
            </div>
            <ol id="todo-list">
                {tasks.map((task, index) =>
                    <TodoItem
                        key={task.id}
                        task={task.text}
                        deleteTaskCallback={() => deleteTask(task.id)}
                        moveTaskUpCallback={() => moveTaskUp(index)}
                        moveTaskDownCallback={()=>moveTaskDown(index)}
                    />
                )}
            </ol>
        </div>
    );
}

export default TodoList;