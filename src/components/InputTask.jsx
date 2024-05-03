import React from 'react';
import styles from '../App.module.css';

export const InputTask = ({ input, setInput, toAdd }) => {

    const handleInput = (e) => {
        setInput(e.target.value);
    }

    const toSubmitForm = (e) => {
        e.preventDefault();
        toAdd();
        setInput(''); 
    }

    return (
        <form className={styles.Form} onSubmit={toSubmitForm}>
            <input className={styles.Input} type="text" name="newTask"
                placeholder='Type a new task...'
                value={input}
                required
                onChange={handleInput}
            />
            <button className={styles.AddBtn} type='submit'> Add Task </button>
        </form>
    )
}
