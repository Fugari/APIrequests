import React from 'react';
import styles from '../../src/App.module.css';


export const TaskList = ({ tasksList, setEditTask, toDeleteTask }) => {

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
                    <button className={styles.DelBtn} onClick={() => toDeleteTask(id)}>Del</button>
                    </div>
                </div>
            ))
            }
        </div>
    )
}
