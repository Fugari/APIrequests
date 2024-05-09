import React, { useEffect, useContext } from 'react';
import styles from '../../src/App.module.css';
import { AppContext } from '../context';

export const InputTask = ({ editTask, setEditTask, toAdd, updateTask }) => {
    const { newValue, setNewValue } = useContext(AppContext);
    
    useEffect(() => {
        if(editTask) {
            setNewValue(editTask.text);
        } else {
            setNewValue('');
        }
    }, [setNewValue, editTask]);

    const handleInput = (e) => {
        setNewValue(e.target.value);
    }

    const toSubmitForm = (e) => {
        e.preventDefault();
        if(!editTask) {
            toAdd();
            setNewValue('');
        } else {
            updateTask(newValue, editTask.id);
            setEditTask('');
        }
    }

    return (
        <form className={styles.Form} onSubmit={toSubmitForm}>
            <input className={styles.Input} type="text" name="newTask"
                placeholder='Type a new task...'
                value={newValue}
                required
                onChange={handleInput}
            />
            <button className={styles.AddBtn} type='submit'> {editTask ? 'OK' : 'Add Task'} </button>
        </form>
    )
}
