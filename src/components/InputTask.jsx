import React, { useEffect } from 'react';
import styles from '../../src/App.module.css';

export const InputTask = ({ input, setInput, editTask, setEditTask, toAdd, updateTask}) => {

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
            toAdd();
            setInput('');
        } else {
            updateTask(input, editTask.id);
            setEditTask('');
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
