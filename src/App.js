import React, { useState, useEffect } from 'react';
import {Header} from './components/Header';
import { InputTask } from './components/InputTask';
import { TaskList } from './components/TaskList';
import styles from './App.module.css';
import { AppContext } from './context';

function App() {
  const [tasksList, setTaskList] = useState([]);
  const [newValue, setNewValue] = useState('');
  const [editTask, setEditTask] = useState(null);
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

  const toEditTask = async(taskInput, taskId) => {
    try {
      await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({text: taskInput})
    })

    }catch(e) {
      console.log(e);
    }
  }

  const toDeleteTask = async(id) => {
    try {
      await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE'
    })
      setTaskList(tasksList.filter((task) => task.id !== id));
    }catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    toGetData();
  }, [tasksList]);

  return (
    <AppContext.Provider value={ {newValue, sortedTaskList, setNewValue} }>
      <div className={styles.App}>
        <Header />
      
        <InputTask
          toAdd={toAddTask}
          newTask={setTaskList}
          editTask={editTask}
          setEditTask={setEditTask}
          updateTask={toEditTask}
        />
     
        <button onClick={() => setSortFilter(!sortFilter)} className={sortFilter ? styles.FilterBtnActived : styles.FilterBtn}>Filter from A-Z</button>

        <input className={styles.SearchInput} placeholder='search for task' type='text' value={search} onChange={(e) => setSearch(e.target.value)} />
      
        <TaskList
          setEditTask={setEditTask}
          toDeleteTask={toDeleteTask}
        />
      
      </div>
    </AppContext.Provider>
  );
}

export default App;
