import React, { useContext } from 'react';
import styles from '../../src/App.module.css';
import { AppContext } from '../context';


export const TaskList = ({ setEditTask, toDeleteTask }) => {
    const { sortedTaskList } = useContext(AppContext);

    const toEditTask = ({ id }) => {
        const findTask = sortedTaskList.find((task) => task.id === id);
        setEditTask(findTask);
    }
    return (
        <div >
            {sortedTaskList.map(({ id, text }) => (
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
