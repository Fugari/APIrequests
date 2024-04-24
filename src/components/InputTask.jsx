import React, { useEffect } from 'react';
import styles from '../../src/App.module.css';

export const InputTask = ({ input, setInput, editTask, setEditTask}) => {

    const updateTask = (input, id) => {
        fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({text: input})
        })
        setEditTask('');
    }

    useEffect(() => {
        if(editTask) {
            setInput(editTask.text);
        } else {
            setInput('');
        }
    }, [setInput, editTask]);

    const handleInput = (e) => {
        setInput(e.target.value);
    }

    const toSubmitForm = (e) => {
        e.preventDefault();
        if(!editTask) {
            fetch('http://localhost:3000/tasks', {
                method: 'POST',
                headers: {'Content-Type': 'application/json;charset=utf-8'},
                body: JSON.stringify({text: input})
            })
            setInput('');
        } else {
            updateTask(input, editTask.id);
        }
        
    }

    return (
        <form className={styles.Form} onSubmit={toSubmitForm}>
            <input className={styles.Input} type="text" name="newTask"
                placeholder='Type a new task...'
                value={input}
                required
                onChange={handleInput}
            />
            <button className={styles.AddBtn} type='submit'> {editTask ? 'OK' : 'Add Task'} </button>
        </form>
    )
}
