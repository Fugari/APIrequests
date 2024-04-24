import React from 'react';
import { ref, remove } from 'firebase/database';
import { dataB } from '../firebaseConfig';
import styles from '../../src/App.module.css';


export const TaskList = ({ tasksList, setEditTask }) => {

    const toDeleteTask = ({ id }) => {
        const taskDelRef = ref(dataB, `tasks/${id}`);
        remove(taskDelRef);
        console.log(id);
    }

    return (
        <div >
            {Object.entries(tasksList).map(([id, { text }]) => (
                <div className={styles.List} key={id}>
                    {text}
                    <div>
                    <button className={styles.EditBtn} onClick={() => setEditTask({id})}>Edit</button>
                    <button className={styles.DelBtn} onClick={() => toDeleteTask({id})}>Del</button>
                    </div>
                </div>
            ))
            }
        </div>
    )
}
