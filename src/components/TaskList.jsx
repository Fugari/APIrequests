import React from 'react';
import styles from '../../src/App.module.css';


export const TaskList = ({ tasksList, setEditTask }) => {

    const toDeleteTask = ({ id }) => {
        //setTaskList(tasksList.filter((task) => task.id !== id));
        fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'DELETE'
        })
        console.log(id);
    }

    const toEditTask = ({ id }) => {
        const findTask = tasksList.find((task) => task.id === id);
        setEditTask(findTask);
    }
    return (
        <div >
            {tasksList.map(({ id, text }) => (
                <div className={styles.List} key={id}>
                    {text}
                    <div>
                    <button className={styles.EditBtn} onClick={() => toEditTask({id})}>Edit</button>
                    <button className={styles.DelBtn} onClick={() => toDeleteTask({id})}>Del</button>
                    </div>
                </div>
            ))
            }
        </div>
    )
}
