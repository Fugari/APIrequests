import React, { useEffect } from 'react';
import { ref, push, set } from 'firebase/database';
import { dataB } from '../firebaseConfig';
import styles from '../../src/App.module.css';

export const InputTask = ({ input, setInput, editTask, setEditTask}) => {


    const updateTask = (input, id) => {
        const updateRef = ref(dataB, `tasks/${id}`);
        set(updateRef, {
            text: input
        })
        console.log(input, id);
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
            const tasksDBref = ref( dataB, 'tasks');
            push(tasksDBref, {
                text: input
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
