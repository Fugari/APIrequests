import React, { useState, useEffect } from 'react';
import {Header, InputTask, TaskList } from './index';
import styles from '../../src/App.module.css';

export const MainPage = () => {
    const [tasksList, setTaskList] = useState([]);
    const [newValue, setNewValue] = useState('');
    const [sortFilter, setSortFilter] = useState(false);
    const [search, setSearch] = useState('');
  
    const toSearchTask = tasksList.filter((task) => task.text.includes(search));
    
    const toFileterButton = () => {
      if(sortFilter) {
        return [...tasksList].sort((a, b) => a['text'].localeCompare(b['text']));
      } else if(search) {
        return toSearchTask;
      }
      return tasksList;
      
    }
    const sortedTaskList = toFileterButton();

    const toGetData = async() => {
      try {
        const res = await fetch('http://localhost:3000/tasks')
        const data = await res.json();
        setTaskList(data)
      }catch(e) {
        console.log(e);
      }
    }

    const toAddTask = async() => {
      try {
        await fetch('http://localhost:3000/tasks', {
          method: 'POST',
          headers: {'Content-Type': 'application/json;charset=utf-8'},
          body: JSON.stringify({text: newValue})
      })
      }catch(e) {
        console.log(e);
      }
    }

    useEffect(() => {
      toGetData();
    }, [tasksList]);
  
    return (
      <div className={styles.App}>
        <Header/>
  
        <InputTask 
          input={newValue}
          setInput={setNewValue}
          tasks={tasksList}
          newTask={setTaskList}
          toAdd={toAddTask}
        />
        <button onClick={() => setSortFilter(!sortFilter)} className={sortFilter ? styles.FilterBtnActived : styles.FilterBtn}>Filter from A-Z</button>
  
        <input className={styles.SearchInput} placeholder='search for task' type='text' value={search} onChange={(e) => setSearch(e.target.value)}/>
  
        <TaskList 
          tasksList={sortedTaskList}
          setTaskList={setTaskList}
        />
  
      </div>
    );
}
