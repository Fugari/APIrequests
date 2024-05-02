import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; 
import styles from '../../src/App.module.css';

export const Task = () => {
    const { id } = useParams();
    const [task, setTask] = useState({});
    const [edit, setEdit] = useState(false);
    const [input, setInput] = useState('');
 
    useEffect(() => {
        if(edit) {
            setInput(task.text);
        }else {
            setInput('');
        }
    }, [edit])
    
    useEffect(() => {
        fetch(`http://localhost:3000/tasks/${id}`, )
            .then(res => res.json())
            .then(data => setTask(data));
    }, [edit]);

    const toDeleteTask = ({ id }) => {
        fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'DELETE'
        })
        alert('The task was deleted');
    }

    const submitChanges = (e) => {
        e.preventDefault();
        toEditTask(id, input);
    }

    const toEditTask = async(id, newValue) => {
        try {
            await fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({text: newValue})
        })
        setTask(newValue);
        }catch(e) {
          console.log(e);
        } 
        setEdit(false);
    }

    return (
        <div className={styles.taskContainer}> 
            {edit ? 
            <form className={styles.TaskForm} onSubmit={submitChanges} id={"editTask"}>
                <textarea className={styles.InputTask} rows={4} type='text' value={input} onChange={(e) => setInput(e.target.value)} />
                <button className={styles.btns} type='submit'>Ok</button>
            </form>
                : <div>{task.text}</div>
            }
            
            <div>
                <Link to='/'><button className={styles.btns}>Back</button></Link>
                <button className={styles.btns} onClick={() => setEdit(true)}>Edit Task</button>
                <Link to='/'><button className={styles.btns} onClick={() => toDeleteTask({id})}>Del</button></Link>
            </div>
        </div>
    )
}
