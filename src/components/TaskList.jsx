import React from 'react';
import styles from '../App.module.css';
import { Link } from 'react-router-dom';


export const TaskList = ({tasksList}) => {

    return (
        <div >
            {tasksList.map(({ id, text }) => (
                <div className={styles.List} key={id}>
                    <Link className={styles.Link} to={`Task/${id}`}>{text}</Link>
                </div>
            ))
            }
        </div>
    )
}
